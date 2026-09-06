"""Validate a generated Jekyll site without third-party dependencies.
Usage: python tests/check_site.py _site [--baseurl /portfolio]
"""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.errors = set(), [], []
        self.h1 = 0
        self.lang = self.description = False
        self.feed(text)
        assert "{{" not in text and "{%" not in text, "Unrendered Liquid"
        assert "LINK_A_TU_REPO" not in text, "Placeholder repository link"

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                self.errors.append("Duplicate ID: " + attrs["id"])
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.h1 += 1
        if tag == "html":
            self.lang = attrs.get("lang") == "es"
        if tag == "meta" and attrs.get("name") == "description":
            self.description = bool(attrs.get("content"))
        if tag == "img" and "alt" not in attrs:
            self.errors.append("Image missing alt")
        if tag == "a" and attrs.get("target") == "_blank":
            if "noopener" not in attrs.get("rel", "").split():
                self.errors.append("External tab missing noopener")
        if tag in {"a", "link"} and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in {"img", "script"} and attrs.get("src"):
            self.links.append(attrs["src"])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("site", nargs="?", default="_site")
    parser.add_argument("--baseurl", default="")
    args = parser.parse_args()
    root = Path(args.site).resolve()
    pages = {p: Page(p.read_text(encoding="utf-8-sig")) for p in root.rglob("*.html")}
    assert pages, "Build the site first: bundle exec jekyll build"
    for file, page in pages.items():
        assert page.lang and page.description and page.h1 == 1, f"Page metadata / h1: {file}"
        assert not page.errors, (file, page.errors)
        for link in page.links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                continue
            url_path = unquote(url.path)
            if args.baseurl and url_path.startswith(args.baseurl + "/"):
                url_path = url_path[len(args.baseurl):]
            if not url_path:
                target = file
            elif url_path.startswith("/"):
                target = root / url_path.lstrip("/")
            else:
                target = file.parent / url_path
            target = target.resolve()
            assert target.is_relative_to(root), f"Path outside site: {link}"
            if target.is_dir():
                target /= "index.html"
            assert target.is_file(), f"Missing target {link} in {file.name}"
            if url.fragment and target in pages:
                assert unquote(url.fragment) in pages[target].ids, f"Missing anchor {link} in {file.name}"
    for xml in ["sitemap.xml", "feed.xml"]:
        ET.parse(root / xml)
    for name in ["index.html", "maps.html", "code.html", "blog.html", "404.html"]:
        assert (root / name) in pages, "Missing page " + name
    print(f"PASS: {len(pages)} pages; local links, assets, anchors, metadata, XML, and accessibility markup.")

if __name__ == "__main__":
    main()
