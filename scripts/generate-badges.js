const fs = require('fs');
const path = require('path');
const https = require('https');

// Функция для безопасного получения данных
function fetchRepoData(repoName) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/war100ck/${repoName}`,
      headers: { 'User-Agent': 'war100ck-badge-generator' },
      timeout: 5000
    };

    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            resolve({
              name: json.name || repoName,
              description: json.description || 'No description',
              language: json.language || 'Unknown',
              success: true
            });
          } catch {
            resolve(createFallbackData(repoName));
          }
        } else {
          resolve(createFallbackData(repoName));
        }
      });
    });

    req.on('error', () => resolve(createFallbackData(repoName)));
    req.on('timeout', () => {
      req.destroy();
      resolve(createFallbackData(repoName));
    });
  });
}

// Fallback данные
function createFallbackData(repoName) {
  const fallbacks = {
    'blade-soul-game-launcher': 'Game launcher for private servers',
    'BNS-Server-Manager': 'Server management tool for BnS',
    'BnS-Api-Server': 'REST API for Blade & Soul servers',
    'Server-Api-BnS-2017': 'Legacy API for 2017 version',
    'Steam-Account-Manager': 'Python/Tkinter app for Steam accounts',
    'bns-client-packer': 'Client packing utility for BnS'
  };
  
  return {
    name: repoName,
    description: fallbacks[repoName] || 'Repository tool',
    language: 'JavaScript',
    success: false
  };
}

// Функция для разбивки описания на строки (как в вашем примере)
function splitDescription(desc) {
  const lines = [];
  const maxLength = 45;
  
  let currentLine = '';
  const words = desc.split(' ');
  
  for (const word of words) {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word.length > maxLength ? word.substring(0, maxLength-3) + '...' : word;
    }
  }
  
  if (currentLine) lines.push(currentLine);
  
  // Ограничиваем максимум 3 строки
  if (lines.length > 3) {
    lines[2] = lines[2].substring(0, Math.min(lines[2].length, maxLength-3)) + '...';
    return lines.slice(0, 3);
  }
  
  return lines;
}

// Генерация SVG в точности как ваш пример
function generateSVG(repoName, repoData, category) {
  const lines = splitDescription(repoData.description);
  const lineSpans = lines.map((line, i) => 
    `<tspan dy="1.2em" x="25">${line}</tspan>`
  ).join('');

  const langColors = {
    'Python': '#3572A5',
    'JavaScript': '#F1E05A',
    'TypeScript': '#2B7489',
    'C++': '#F34B7D',
    'C#': '#178600',
    'Java': '#B07219',
    'Unknown': '#555555'
  };

  const langColor = langColors[repoData.language] || '#555555';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
    width="400"
    height="150"
    viewBox="0 0 400 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="descId"
>
    <title id="titleId">${repoData.name}</title>
    <desc id="descId">${repoData.description}</desc>
    <style>
        .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #fff;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
        }
        @supports(-moz-appearance: auto) {
            .header { font-size: 15.5px; }
        }
        
        .description { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: #fff }
        .gray { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #fff }
        .icon { fill: #4c71f2 }
        .badge { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; }
        .badge rect { opacity: 0.2 }
        
        @keyframes scaleInAnimation {
            from { transform: translate(-5px, 5px) scale(0); }
            to { transform: translate(-5px, 5px) scale(1); }
        }
        @keyframes fadeInAnimation {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        * { animation-duration: 0s !important; animation-delay: 0s !important; }
    </style>

    <defs>
        <linearGradient
            id="gradient"
            gradientTransform="rotate(30)"
            gradientUnits="userSpaceOnUse"
        >
            <stop offset="0%" stop-color="#0d1117" />
            <stop offset="100%" stop-color="#0078D6" />
        </linearGradient>
    </defs>

    <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        rx="4.5"
        height="99%"
        stroke="#e4e2e2"
        width="399"
        fill="url(#gradient)"
        stroke-opacity="0"
    />

    <g data-testid="card-title" transform="translate(25, 35)">
        <g transform="translate(0, 0)">
            <svg
                class="icon"
                x="0"
                y="-13"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
            >
                <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
        </g>
        <g transform="translate(25, 0)">
            <text x="0" y="0" class="header" data-testid="header">
                ${repoData.name}
            </text>
        </g>
    </g>

    <g data-testid="main-card-body" transform="translate(0, 55)">
        <text class="description" x="25" y="-5">
            ${lineSpans}
        </text>

        <g transform="translate(30, 75)">
            <g transform="translate(0, 0)">
                <g data-testid="primary-lang">
                    <circle data-testid="lang-color" cx="0" cy="-5" r="6" fill="${langColor}" />
                    <text data-testid="lang-name" class="gray" x="15">${repoData.language}</text>
                </g>
            </g>
        </g>
    </g>
</svg>`;
}

// Основная функция
async function main() {
  console.log('🚀 Starting badge generation...');
  
  // Читаем репозитории
  const repos = JSON.parse(fs.readFileSync('repos.json', 'utf8')).repositories;
  
  // Создаем папку badges если нет
  if (!fs.existsSync('badges')) {
    fs.mkdirSync('badges');
  }
  
  // Обрабатываем каждый репозиторий
  for (const repo of repos) {
    try {
      console.log(`📦 Processing: ${repo.name}`);
      
      // Получаем данные
      const repoData = await fetchRepoData(repo.name);
      
      // Генерируем SVG
      const svg = generateSVG(repo.name, repoData, repo.category);
      
      // Сохраняем
      fs.writeFileSync(`badges/${repo.name}.svg`, svg);
      console.log(`   ✅ Generated: badges/${repo.name}.svg`);
      
      // Пауза между запросами
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`   ❌ Error with ${repo.name}: ${error.message}`);
      // Создаем fallback SVG
      const fallbackData = createFallbackData(repo.name);
      const svg = generateSVG(repo.name, fallbackData, repo.category);
      fs.writeFileSync(`badges/${repo.name}.svg`, svg);
      console.log(`   ✅ Created fallback for: ${repo.name}`);
    }
  }
  
  console.log('🎉 All badges generated!');
}

// Запуск
if (require.main === module) {
  main().catch(console.error);
}