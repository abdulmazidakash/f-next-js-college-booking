/* 
button color: #DA202F
navbar color: #FCF1F5
footer color: #FCF1F5
bg color: ##F7C8CE
title text color: class="text-4xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent"



--------------initial global.css------------
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #DA202F;

}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: #DA202F;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}



*/