import os
import re

print("=== АНАЛИЗ SVG ФАЙЛОВ ===")

for filename in sorted(os.listdir('profile-3d-contrib')):
    if not filename.endswith('.svg'):
        continue
    filepath = os.path.join('profile-3d-contrib', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ищем ВСЕ цвета в файле
    colors = set()
    # Hex colors
    hex_colors = re.findall(r'#[0-9a-fA-F]{3,8}', content)
    colors.update(hex_colors)
    # rgb colors
    rgb_colors = re.findall(r'rgb\([^)]+\)', content)
    colors.update(rgb_colors)
    # Цвета в style
    style_colors = re.findall(r'fill:\s*([^;"\s]+)', content)
    colors.update(style_colors)

    print(f"\n{filename}:")
    print(f"  Найдено цветов: {sorted(colors)}")
    print(f"  Размер файла: {len(content)} bytes")
    print(f"  Первые 500 символов: {content[:500]}")

print("\n=== КОНЕЦ АНАЛИЗА ===")

# Теперь меняем цвета
for filename in os.listdir('profile-3d-contrib'):
    if not filename.endswith('.svg'):
        continue
    filepath = os.path.join('profile-3d-contrib', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Заменяем ВСЕ тёмные цвета на none
    dark_colors = ['#0d1117', '#161b22', '#000000', '#000', '#010409', 
                   '#21262d', '#111111', '#0a0c10', '#010101', '#0D1117',
                   '#161B22', '#21262D']
    for c in dark_colors:
        content = content.replace(c, 'none')

    # Заменяем ВСЕ светлые цвета на #0078D6
    light_colors = ['#ffffff', '#fff', '#c9d1d9', '#e6edf3', '#f0f6fc',
                    '#8b949e', '#bdc5cd', '#d0d7de', '#FFFFFF', '#C9D1D9']
    for c in light_colors:
        content = content.replace(c, '#0078D6')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed: {filename}")
