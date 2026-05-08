#!/usr/bin/env python3
"""Inject compiled DevSupportManagerBase*.class into react-native AAR (replaces classes.jar entries)."""
from __future__ import annotations

import json
import shutil
import sys
import tempfile
import zipfile
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 4:
        print(
            "Usage: merge_rn_devsupport_patch.py <react-native.aar> <compiled_classes_dir> <marker_json>",
            file=sys.stderr,
        )
        return 2
    aar_path = Path(sys.argv[1]).resolve()
    compiled = Path(sys.argv[2]).resolve()
    marker = Path(sys.argv[3]).resolve()
    if not aar_path.is_file():
        print(f"Missing AAR: {aar_path}", file=sys.stderr)
        return 1
    if not compiled.is_dir():
        print(f"Missing compiled classes dir: {compiled}", file=sys.stderr)
        return 1

    prefix = "com/facebook/react/devsupport/DevSupportManagerBase"
    new_class_files: list[Path] = []
    for p in sorted(compiled.rglob("*.class")):
        rel = p.relative_to(compiled).as_posix()
        if prefix in rel:
            new_class_files.append(p)
    if not new_class_files:
        print(f"No DevSupportManagerBase*.class under {compiled}", file=sys.stderr)
        return 1

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        extracted_jar = tmp / "classes.jar"
        rebuilt_jar = tmp / "classes-rebuilt.jar"
        out_aar = tmp / "patched.aar"

        with zipfile.ZipFile(aar_path, "r") as zroot:
            if "classes.jar" not in _names(zroot):
                print("AAR has no classes.jar", file=sys.stderr)
                return 1
            zroot.extract("classes.jar", tmp)

        removed: list[str] = []
        with zipfile.ZipFile(extracted_jar, "r") as zin, zipfile.ZipFile(
            rebuilt_jar, "w", compression=zipfile.ZIP_DEFLATED
        ) as zout:
            for zi in zin.infolist():
                if zi.is_dir():
                    continue
                name = zi.filename
                if name.endswith(".class") and name.startswith(prefix):
                    removed.append(name)
                    continue
                zout.writestr(zi, zin.read(zi))
            for p in new_class_files:
                arc = p.relative_to(compiled).as_posix()
                zout.write(p, arc)

        # Rebuild AAR with new classes.jar
        with zipfile.ZipFile(aar_path, "r") as zin, zipfile.ZipFile(
            out_aar, "w", compression=zipfile.ZIP_DEFLATED
        ) as zout:
            for zi in zin.infolist():
                if zi.is_dir():
                    continue
                if zi.filename == "classes.jar":
                    zout.write(rebuilt_jar, "classes.jar")
                else:
                    zout.writestr(zi, zin.read(zi))

        shutil.copy2(out_aar, aar_path)

    marker.parent.mkdir(parents=True, exist_ok=True)
    marker.write_text(
        json.dumps(
            {
                "aar": str(aar_path),
                "removedCount": len(removed),
                "injectedCount": len(new_class_files),
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Patched {aar_path}")
    return 0


def _names(zf: zipfile.ZipFile) -> set[str]:
    return {zi.filename for zi in zf.infolist()}


if __name__ == "__main__":
    raise SystemExit(main())
