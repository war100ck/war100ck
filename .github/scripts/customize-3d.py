import os
import re

# Фоновые цвета (в разных форматах)
bg_patterns = [
    r'#0d1117', r'#161b22', r'#000000', r'#000\b', r'#010409', r'#21262d',
    r'#111111', r'#0a0c10', r'#010101', r'rgb\(13,\s*17,\s*23\)',
    r'rgb\(22,\s*27,\s*34\)', r'rgb\(0,\s*0,\s*0\)',
]

# Текстовые цвета
text_patterns = [
    r'#ffffff', r'#fff\b', r'#c9d1d9', r'#e6edf3', r'#f0f6fc',
    r'#8b949e', r'#bdc5cd', r'#d0d7de', r'#ffffff',
    r'rgb\(255,\s*255,\s*255\)', r'rgb\(201,\s*209,\s*217\)',
]

for filename in os.listdir('profile-3d-contrib'):
    if not filename.endswith('.svg'):
        continue
    filepath = os.path.join('profile-3d-contrib', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Заменяем фоновые цвета
    for pattern in bg_patterns:
        content = re.sub(pattern, 'none', content, flags=re.IGNORECASE)

    # Заменяем текстовые цвета
    for pattern in text_patterns:
        content = re.sub(pattern, '#0078D6', content, flags=re.IGNORECASE)

    # Убираем background в style
    content = re.sub(r'background(?:-color)?\s*:\s*[^;"]+', '', content, flags=re.IGNORECASE)

    # Убираем fill в style для фоновых элементов (rect без stroke)
    content = re.sub(
        r'(<rect[^>]*?)style="([^"]*)fill\s*:\s*none([^"]*)"',
        r'\1style="\2\3"',
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed: {filename}")
