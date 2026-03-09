import os
import re

dir_path = r"C:\Users\D067009\.gemini\antigravity\scratch\e-waste-data-flows"

page_map = {
    "dashboard": "data-flows.html",
    "overview": "data-flows.html",
    "impact": "environmental-impact.html",
    "esg": "environmental-impact.html",
    "proposal": "zone-development.html",
    "zone": "zone-development.html",
    "job": "job-forecast.html",
    "report": "job-forecast.html",
    "hardware": "hardware-exchange.html",
    "inventory": "hardware-exchange.html",
    "asset": "hardware-exchange.html",
    "contact": "index.html",
    "privacy": "index.html",
    "terms": "index.html",
    "settings": "index.html",
    "started": "zone-development.html",
    "briefing": "zone-development.html",
    "manage all": "data-flows.html",
    "add listing": "hardware-exchange.html",
    "export": "data-flows.html",
    "download": "data-flows.html",
    "view all": "data-flows.html",
    "share": "zone-development.html"
}

def infer_link(text):
    text = text.lower()
    for key, value in page_map.items():
        if key in text:
            return value
    return "index.html"

for filename in os.listdir(dir_path):
    if not filename.endswith(".html"):
        continue
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace href="#" based on anchor text
    def replace_href(match):
        full_match = match.group(0)
        anchor_text = match.group(1)
        target = infer_link(anchor_text)
        return full_match.replace('href="#"', f'href="{target}"')
    
    # regex to find <a ... href="#" ...>...</a>
    content = re.sub(r'<a[^>]*href="#"[^>]*>(.*?)</a>', replace_href, content, flags=re.DOTALL | re.IGNORECASE)

    # Replace <button> without onclick based on button text
    def replace_button(match):
        full_match = match.group(0)
        button_attrs = match.group(1)
        button_text = match.group(2)
        if 'onclick' in button_attrs:
            return full_match
        target = infer_link(button_text)
        return f'<button{button_attrs} onclick="window.location.href=\'{target}\'">{button_text}</button>'

    # regex to find <button ...>...</button>
    content = re.sub(r'<button([^>]*)>(.*?)</button>', replace_button, content, flags=re.DOTALL | re.IGNORECASE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Links and buttons updated successfully.")
