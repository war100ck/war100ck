import os
import re

for filename in os.listdir('profile-3d-contrib'):
    if not filename.endswith('.svg'):
        continue
    filepath = os.path.join('profile-3d-contrib', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Фон: любые тёмные цвета → none
    # #00000f, #000000, #000 и т.д.
    content = re.sub(r'#0{3,6}f?', 'none', content, flags=re.IGNORECASE)
    content = re.sub(r'#0{6}', 'none', content, flags=re.IGNORECASE)
    content = re.sub(r'#000', 'none', content, flags=re.IGNORECASE)

    # Текст: #eeeeff, #ffffff, #fff → #0078D6
    content = re.sub(r'#eeeeff', '#0078D6', content, flags=re.IGNORECASE)
    content = re.sub(r'#ffffff', '#0078D6', content, flags=re.IGNORECASE)
    content = re.sub(r'#fff', '#0078D6', content, flags=re.IGNORECASE)

    # Светло-серые → #0078D6
    content = re.sub(r'#aaaaaa', '#0078D6', content, flags=re.IGNORECASE)
    content = re.sub(r'#cccccc', '#0078D6', content, flags=re.IGNORECASE)
    content = re.sub(r'#dddddd', '#0078D6', content, flags=re.IGNORECASE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    changed = 'CHANGED' if content != original else 'NO CHANGE'
    print(f"Processed: {filename} — {changed}")
