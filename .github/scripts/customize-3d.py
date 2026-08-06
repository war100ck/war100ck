import os
import re

# РЕАЛЬНЫЕ цвета из SVG (из логов)
dark_colors = ['#00000f', '#000000', '#000', '#111111', '#0a0c10']
light_colors = ['#eeeeff', '#ffffff', '#fff', '#eeeeee', '#cccccc']

for filename in os.listdir('profile-3d-contrib'):
    if not filename.endswith('.svg'):
        continue
    filepath = os.path.join('profile-3d-contrib', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Заменяем тёмные цвета фона на none
    for c in dark_colors:
        content = content.replace(c, 'none')

    # Заменяем светлые цвета текста на #0078D6
    for c in light_colors:
        content = content.replace(c, '#0078D6')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed: {filename}")
