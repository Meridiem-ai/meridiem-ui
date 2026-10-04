"""Transforme dist/index.html (page Vite autonome) en page d'artifact claude.ai : sans doctype ni html/head/body,
le reste (title, style, script module inline) est gardé dans l'ordre. Usage : python3 scripts/artifact.py <sortie.html>"""
import re, sys, pathlib
src = pathlib.Path(__file__).resolve().parent.parent / "dist" / "index.html"
s = src.read_text(encoding="utf-8")
s = re.sub(r"<!doctype html>", "", s, flags=re.I)
s = re.sub(r"</?(html|head|body)(\s[^>]*)?>", "", s, flags=re.I)
s = re.sub(r"<meta[^>]*>", "", s, flags=re.I)
# Le parseur HTML embarqué (parse5) contient U+FFFD dans des gabarits JS : on l'écrit en séquence d'échappement.
s = s.replace("\ufffd", "\\uFFFD")
pathlib.Path(sys.argv[1]).write_text(s.strip() + "\n", encoding="utf-8")
print("ok", len(s))
