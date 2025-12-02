const fs = require('fs');

// Данные для каждого репозитория
const projects = {
  'blade-soul-game-launcher': {
    title: 'Blade & Soul Launcher',
    description: 'Game launcher for private servers with auto-update and mod support',
    language: 'Python'
  },
  'BNS-Server-Manager': {
    title: 'BNS Server Manager',
    description: 'Server management tool for Blade & Soul private servers',
    language: 'JavaScript'
  },
  'BnS-Api-Server': {
    title: 'BNS API Server',
    description: 'REST API server for Blade & Soul game data and account management',
    language: 'JavaScript'
  },
  'Server-Api-BnS-2017': {
    title: 'BNS API Server 2017',
    description: 'Legacy API server for 2017 version of Blade & Soul',
    language: 'JavaScript'
  },
  'Steam-Account-Manager': {
    title: 'Steam Account Manager',
    description: 'Python/Tkinter desktop application for managing multiple Steam accounts',
    language: 'Python'
  },
  'bns-client-packer': {
    title: 'BNS Client Packer',
    description: 'Utility for packing and unpacking Blade & Soul client files',
    language: 'Python'
  }
};

// Твой точный SVG шаблон
function createBadge(repoKey) {
  const project = projects[repoKey];
  
  return `<svg
    width="400"
    height="150"
    viewBox="0 0 400 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="descId"
  >
    <title id="titleId">${project.title}</title>
    <desc id="descId">${project.description}</desc>
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
      * { animation-duration: 0s !important; animation-delay: 0s !important; }
    </style>

    <defs>
      <linearGradient id="gradient" gradientTransform="rotate(30)">
        <stop offset="0%" stop-color="#0d1117" />
        <stop offset="100%" stop-color="#0078D6" />
      </linearGradient>
    </defs>

    <rect
      x="0.5"
      y="0.5"
      rx="4.5"
      height="99%"
      stroke="#e4e2e2"
      width="399"
      fill="url(#gradient)"
      stroke-opacity="0"
    />

    <g transform="translate(25, 35)">
      <g transform="translate(0, 0)">
        <svg class="icon" x="0" y="-13" viewBox="0 0 16 16" width="16" height="16">
          <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
        </svg>
      </g>
      <g transform="translate(25, 0)">
        <text x="0" y="0" class="header">${project.title}</text>
      </g>
    </g>

    <g transform="translate(0, 55)">
      <text class="description" x="25" y="-5">
        <tspan dy="1.2em" x="25">${project.description.substring(0, 45)}</tspan>
        <tspan dy="1.2em" x="25">${project.description.substring(45, 90)}...</tspan>
      </text>

      <g transform="translate(30, 75)">
        <circle cx="0" cy="-5" r="6" fill="${project.language === 'Python' ? '#3572A5' : '#F1E05A'}" />
        <text class="gray" x="15">${project.language}</text>
      </g>
    </g>
  </svg>`;
}

// Создаем бейджи
console.log('Creating badges...');
if (!fs.existsSync('badges')) fs.mkdirSync('badges');

Object.keys(projects).forEach(repo => {
  fs.writeFileSync(`badges/${repo}.svg`, createBadge(repo));
  console.log(`✓ ${repo}.svg`);
});

console.log('Done!');