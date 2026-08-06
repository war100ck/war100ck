import os
import re

# Цвета для замены
bg_colors = ['#0d1117', '#161b22', '#000000', '#000', '#010409', '#21262d', '#111111']
text_colors = ['#ffffff', '#fff', '#c9d1d9', '#e6edf3', '#f0f6fc', '#8b949e', '#bdc5cd']

for filename in os.listdir('profile-3d-contrib'):
    if not filename.endswith('.svg'):
        continue
    filepath = os.path.join('profile-3d-contrib', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Заменяем фоновые цвета на прозрачный
    for color in bg_colors:
        content = content.replace(f'fill="{color}"', 'fill="none"')
        content = content.replace(f'fill:{color}', 'fill:none')
        content = content.replace(f'fill: {color}', 'fill: none')
        content = content.replace(f'stop-color:{color}', 'stop-color:none')
        content = content.replace(f'stop-color: {color}', 'stop-color: none')

    # Заменяем текстовые цвета на неоновый синий
    for color in text_colors:
        content = content.replace(f'fill="{color}"', 'fill="#0078D6"')
        content = content.replace(f'fill:{color}', 'fill:#0078D6')
        content = content.replace(f'fill: {color}', 'fill: #0078D6')
        content = content.replace(f'stop-color:{color}', 'stop-color:#0078D6')
        content = content.replace(f'stop-color: {color}', 'stop-color: #0078D6')

    # Убираем background в style тегах
    content = re.sub(r'background(?:-color)?:\s*#[0-9a-fA-F]{3,8}', '', content)
    content = re.sub(r'background(?:-color)?="[^"]*"', '', content)

    # Убираем rect с фоном (первый rect часто — фон)
    content = re.sub(r'<rect[^>]*fill="none"[^>]*/>', '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Processed: {filename}")
