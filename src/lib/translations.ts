export type Locale = "en" | "ru" | "sr";

export interface Translations {
  nav: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
    resume: string;
  };
  hero: {
    label: string;
    greeting: string;
    name: string;
    description: string;
    viewWork: string;
    getInTouch: string;
  };
  about: {
    label: string;
    titleStart: string;
    titleHighlight: string;
    p1: string;
    p2: string;
    p3: string;
    highlights: {
      frontend: { title: string; description: string };
      backend: { title: string; description: string };
      database: { title: string; description: string };
      cloud: { title: string; description: string };
    };
  };
  skills: {
    label: string;
    title: string;
    categories: {
      backend: string;
      frontend: string;
      databaseCloud: string;
      toolsDesign: string;
      ai: string;
      aiSubtitle: string;
    };
  };
  projects: {
    label: string;
    title: string;
    professionalWork: string;
    proprietary: string;
    personalProjects: string;
    openSource: string;
    workProjects: {
      title: string;
      description: string;
    }[];
    personal: {
      title: string;
      description: string;
    }[];
  };
  experience: {
    label: string;
    title: string;
    items: {
      role: string;
      period: string;
      description: string;
      location: string;
    }[];
  };
  contact: {
    label: string;
    title: string;
    description: string;
    email: string;
    location: string;
    locationValue: string;
    socials: string;
    sendEmail: string;
  };
  footer: {
    rights: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      label: "Software Engineer",
      greeting: "Hi, I'm",
      name: "Marko Jovovic",
      description:
        "Software Engineer with 5+ years of experience building scalable web applications and robust APIs with Python, Django, React, and AWS. Passionate about clean architecture, process automation, and delivering exceptional digital experiences.",
      viewWork: "View My Work",
      getInTouch: "Get In Touch",
    },
    about: {
      label: "About Me",
      titleStart: "Crafting digital solutions with ",
      titleHighlight: "precision",
      p1: "I'm a Software Engineer with over 5 years of experience, currently working at Endava as an Application Management Engineer. My background in Mechatronics from the University of Novi Sad gave me a strong analytical foundation that I bring to every project.",
      p2: "I specialize in building REST APIs with Django REST Framework, full-stack applications with React and Angular, and cloud solutions on AWS. I also design UI/UX in Figma and architect complete platform systems from the ground up.",
      p3: "I thrive on automating manual processes, solving complex problems, and communicating directly with clients to deliver solutions that truly meet their needs.",
      highlights: {
        frontend: { title: "Frontend", description: "React, Angular, Next.js, Tailwind CSS" },
        backend: { title: "Backend", description: "Python, Django, Django REST Framework" },
        database: { title: "Database", description: "PostgreSQL, MySQL, DynamoDB, SQL" },
        cloud: { title: "Cloud & DevOps", description: "AWS, Docker, CI/CD, Linux" },
      },
    },
    skills: {
      label: "Skills",
      title: "Technologies I work with",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        databaseCloud: "Database & Cloud",
        toolsDesign: "Tools & Design",
        ai: "AI-Assisted Development",
        aiSubtitle: "Leveraging AI coding tools to accelerate development workflows and stay aligned with industry trends.",
      },
    },
    projects: {
      label: "Projects",
      title: "What I've built",
      professionalWork: "Professional Work",
      proprietary: "Proprietary",
      personalProjects: "Personal Projects",
      openSource: "Open Source",
      workProjects: [
        {
          title: "Data Search & Analytics Platform",
          description: "Full-stack web application combining Python Django APIs with AWS OpenSearch and React to search, analyze, and visualize large datasets. Designed complete system architecture and UI/UX in Figma.",
        },
        {
          title: "REST API with AWS Integration",
          description: "Comprehensive REST API built with Django REST Framework, leveraging AWS DynamoDB for NoSQL storage, RDS for relational data, and S3 for file management. Architected for scalability and performance.",
        },
        {
          title: "3D Avatar ChatBot",
          description: "Interactive Web UI ChatBot featuring a dynamic 3D avatar built with Blender 3D and rendered in-browser using React Three Fiber. Powered by Next.js for server-side rendering and optimal performance.",
        },
        {
          title: "Enterprise Platform Rebuild",
          description: "Complete platform rebuild using Angular 19 with custom-built components and PrimeNG integration. Included data mapping and migration across two platform versions.",
        },
        {
          title: "Process Automation Scripts",
          description: "Collection of Python scripts developed to automate manual processes and improve team efficiency across development and operations workflows.",
        },
        {
          title: "YOLO Object Detection GUI",
          description: "Enhanced YOLO algorithm for optimized object detection with a user-friendly GUI application built with Python and Tkinter.",
        },
      ],
      personal: [
        {
          title: "PyQt6 MultiSelect ComboBox",
          description: "Published PyPI package (7.4K+ downloads) providing a feature-rich multi-select combobox widget for PyQt6. Includes Select All, bulk operations, performance optimizations for large datasets, full test coverage, and documentation on ReadTheDocs.",
        },
        {
          title: "PyRex",
          description: "Python GUI tool for visually testing regular expressions — an offline alternative to regex101. Built with PyQt and the re module, featuring real-time pattern matching, result highlighting, and a Python code generator.",
        },
        {
          title: "Portfolio Website",
          description: "Personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Features light/dark mode, responsive design, and smooth scroll animations.",
        },
      ],
    },
    experience: {
      label: "Experience",
      title: "Where I've worked",
      items: [
        {
          role: "Application Management Engineer",
          period: "May 2022 — Present",
          location: "Serbia",
          description: "Developed REST APIs using Django REST Framework with AWS DynamoDB, RDS and S3. Built full-stack web applications combining Python Django APIs with AWS OpenSearch and React for data search, analysis and visualization. Created automation scripts to streamline manual processes. Developed a Web UI ChatBot with dynamic 3D avatar using Next.js, Blender 3D and React Three Fiber. Designed UI/UX for web applications using Figma. Architected complete platform systems and rebuilt a platform using Angular 19 with custom components and PrimeNG.",
        },
        {
          role: "PDE Laboratory (Test) Engineer",
          period: "Jan 2021 — May 2022",
          location: "Serbia",
          description: "Planned and implemented laboratory tests in accordance with testing standards. Monitored test results by validating data accuracy and interpreting findings. Participated in continuous improvement of test equipment, procedures, and workflow. Gained foundational understanding of the IATF 16949:2016 automotive quality standard.",
        },
        {
          role: "Machine Learning Intern",
          period: "Jun 2019 — Jul 2019",
          location: "Serbia",
          description: "Enhanced YOLO algorithm for optimized object detection through analysis and modification. Developed user-friendly GUI applications for object detection using Python and Tkinter.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's work together",
      description: "I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out.",
      email: "Email",
      location: "Location",
      locationValue: "Serbia (Remote Worldwide)",
      socials: "Socials",
      sendEmail: "Send Me an Email",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },

  ru: {
    nav: {
      about: "Обо мне",
      skills: "Навыки",
      projects: "Проекты",
      experience: "Опыт",
      contact: "Контакт",
      resume: "Резюме",
    },
    hero: {
      label: "Инженер-программист",
      greeting: "Привет, я",
      name: "Марко Йовович",
      description:
        "Инженер-программист с более чем 5-летним опытом разработки масштабируемых веб-приложений и надёжных API на Python, Django, React и AWS. Увлечён чистой архитектурой, автоматизацией процессов и созданием исключительного цифрового опыта.",
      viewWork: "Мои работы",
      getInTouch: "Связаться",
    },
    about: {
      label: "Обо мне",
      titleStart: "Создаю цифровые решения с ",
      titleHighlight: "точностью",
      p1: "Я инженер-программист с более чем 5-летним опытом работы, в настоящее время работаю в Endava в должности Application Management Engineer. Моё образование в области мехатроники в Университете Нови-Сада дало мне сильную аналитическую базу, которую я применяю в каждом проекте.",
      p2: "Я специализируюсь на разработке REST API с Django REST Framework, полнофункциональных приложений с React и Angular, а также облачных решений на AWS. Также занимаюсь проектированием UI/UX в Figma и архитектурой платформенных систем с нуля.",
      p3: "Мне нравится автоматизировать рутинные процессы, решать сложные задачи и напрямую общаться с клиентами, чтобы создавать решения, которые действительно отвечают их потребностям.",
      highlights: {
        frontend: { title: "Фронтенд", description: "React, Angular, Next.js, Tailwind CSS" },
        backend: { title: "Бэкенд", description: "Python, Django, Django REST Framework" },
        database: { title: "Базы данных", description: "PostgreSQL, MySQL, DynamoDB, SQL" },
        cloud: { title: "Облако и DevOps", description: "AWS, Docker, CI/CD, Linux" },
      },
    },
    skills: {
      label: "Навыки",
      title: "Технологии, с которыми я работаю",
      categories: {
        backend: "Бэкенд",
        frontend: "Фронтенд",
        databaseCloud: "Базы данных и облако",
        toolsDesign: "Инструменты и дизайн",
        ai: "Разработка с ИИ",
        aiSubtitle: "Использование ИИ-инструментов для ускорения процессов разработки и соответствия требованиям индустрии.",
      },
    },
    projects: {
      label: "Проекты",
      title: "Что я создал",
      professionalWork: "Рабочие проекты",
      proprietary: "Проприетарные",
      personalProjects: "Личные проекты",
      openSource: "Открытый исходный код",
      workProjects: [
        {
          title: "Платформа поиска и аналитики данных",
          description: "Полнофункциональное веб-приложение, объединяющее API на Python Django с AWS OpenSearch и React для поиска, анализа и визуализации больших данных. Спроектировал полную архитектуру системы и UI/UX в Figma.",
        },
        {
          title: "REST API с интеграцией AWS",
          description: "Комплексный REST API на Django REST Framework с использованием AWS DynamoDB для NoSQL-хранения, RDS для реляционных данных и S3 для управления файлами. Спроектирован для масштабируемости и производительности.",
        },
        {
          title: "3D Аватар Чат-бот",
          description: "Интерактивный веб-чат-бот с динамическим 3D-аватаром, созданным в Blender 3D и отрисованным в браузере с помощью React Three Fiber. Работает на Next.js для серверного рендеринга и оптимальной производительности.",
        },
        {
          title: "Перестройка корпоративной платформы",
          description: "Полная перестройка платформы на Angular 19 с собственными компонентами и интеграцией PrimeNG. Включала маппинг и миграцию данных между двумя версиями платформы.",
        },
        {
          title: "Скрипты автоматизации процессов",
          description: "Набор Python-скриптов для автоматизации ручных процессов и повышения эффективности команды в рабочих процессах разработки и эксплуатации.",
        },
        {
          title: "GUI для обнаружения объектов YOLO",
          description: "Усовершенствованный алгоритм YOLO для оптимизированного обнаружения объектов с удобным GUI-приложением на Python и Tkinter.",
        },
      ],
      personal: [
        {
          title: "PyQt6 MultiSelect ComboBox",
          description: "Опубликованный PyPI-пакет (7.4K+ загрузок), предоставляющий многофункциональный виджет мультивыбора для PyQt6. Включает выбор всех, массовые операции, оптимизацию производительности для больших наборов данных, полное покрытие тестами и документацию на ReadTheDocs.",
        },
        {
          title: "PyRex",
          description: "Python GUI-инструмент для визуального тестирования регулярных выражений — офлайн-альтернатива regex101. Построен на PyQt и модуле re с поддержкой сопоставления шаблонов в реальном времени, подсветки результатов и генерации кода Python.",
        },
        {
          title: "Портфолио-сайт",
          description: "Персональное портфолио на Next.js, Tailwind CSS и Framer Motion. Поддерживает светлую/тёмную тему, адаптивный дизайн и плавные анимации прокрутки.",
        },
      ],
    },
    experience: {
      label: "Опыт",
      title: "Где я работал",
      items: [
        {
          role: "Инженер по управлению приложениями",
          period: "Май 2022 — Настоящее время",
          location: "Сербия",
          description: "Разрабатывал REST API на Django REST Framework с AWS DynamoDB, RDS и S3. Создавал полнофункциональные веб-приложения, объединяя Python Django API с AWS OpenSearch и React для поиска, анализа и визуализации данных. Автоматизировал ручные процессы. Разработал веб-чат-бот с динамическим 3D-аватаром на Next.js, Blender 3D и React Three Fiber. Проектировал UI/UX в Figma. Архитектурировал платформенные системы и перестроил платформу на Angular 19 с собственными компонентами и PrimeNG.",
        },
        {
          role: "Инженер-лаборант (PDE)",
          period: "Янв 2021 — Май 2022",
          location: "Сербия",
          description: "Планировал и проводил лабораторные испытания в соответствии со стандартами тестирования. Контролировал результаты тестов, проверяя точность данных и интерпретируя результаты. Участвовал в непрерывном совершенствовании испытательного оборудования, процедур и рабочих процессов. Получил базовое понимание автомобильного стандарта качества IATF 16949:2016.",
        },
        {
          role: "Стажёр по машинному обучению",
          period: "Июн 2019 — Июл 2019",
          location: "Сербия",
          description: "Усовершенствовал алгоритм YOLO для оптимизированного обнаружения объектов путём анализа и модификации. Разработал удобные GUI-приложения для обнаружения объектов на Python и Tkinter.",
        },
      ],
    },
    contact: {
      label: "Контакт",
      title: "Давайте работать вместе",
      description: "Я открыт для новых возможностей и сотрудничества. Если у вас есть проект или вы просто хотите связаться — не стесняйтесь написать.",
      email: "Почта",
      location: "Местоположение",
      locationValue: "Сербия (удалённо по всему миру)",
      socials: "Соцсети",
      sendEmail: "Написать мне",
    },
    footer: {
      rights: "Все права защищены.",
    },
  },

  sr: {
    nav: {
      about: "O meni",
      skills: "Veštine",
      projects: "Projekti",
      experience: "Iskustvo",
      contact: "Kontakt",
      resume: "CV",
    },
    hero: {
      label: "Softverski inženjer",
      greeting: "Zdravo, ja sam",
      name: "Marko Jovović",
      description:
        "Softverski inženjer sa više od 5 godina iskustva u razvoju skalabilnih veb-aplikacija i robusnih API-ja koristeći Python, Django, React i AWS. Posvećen čistoj arhitekturi, automatizaciji procesa i isporuci izuzetnih digitalnih iskustava.",
      viewWork: "Pogledaj radove",
      getInTouch: "Kontaktiraj me",
    },
    about: {
      label: "O meni",
      titleStart: "Kreiram digitalna rešenja sa ",
      titleHighlight: "preciznošću",
      p1: "Ja sam softverski inženjer sa više od 5 godina iskustva, trenutno zaposlen u kompaniji Endava kao Application Management Engineer. Moje obrazovanje iz mehatronike na Univerzitetu u Novom Sadu dalo mi je snažnu analitičku osnovu koju primenjujem u svakom projektu.",
      p2: "Specijalizovan sam za izradu REST API-ja sa Django REST Framework-om, full-stack aplikacija sa React-om i Angular-om, kao i cloud rešenja na AWS-u. Takođe dizajniram UI/UX u Figmi i projektujem kompletne platformske sisteme od nule.",
      p3: "Uživam u automatizaciji ručnih procesa, rešavanju složenih problema i direktnoj komunikaciji sa klijentima kako bih isporučio rešenja koja zaista odgovaraju njihovim potrebama.",
      highlights: {
        frontend: { title: "Frontend", description: "React, Angular, Next.js, Tailwind CSS" },
        backend: { title: "Backend", description: "Python, Django, Django REST Framework" },
        database: { title: "Baze podataka", description: "PostgreSQL, MySQL, DynamoDB, SQL" },
        cloud: { title: "Cloud i DevOps", description: "AWS, Docker, CI/CD, Linux" },
      },
    },
    skills: {
      label: "Veštine",
      title: "Tehnologije sa kojima radim",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        databaseCloud: "Baze podataka i cloud",
        toolsDesign: "Alati i dizajn",
        ai: "Razvoj uz pomoć AI",
        aiSubtitle: "Korišćenje AI alata za kodiranje kako bi se ubrzali razvojni procesi i pratili trendovi industrije.",
      },
    },
    projects: {
      label: "Projekti",
      title: "Šta sam napravio",
      professionalWork: "Profesionalni radovi",
      proprietary: "Vlasnički",
      personalProjects: "Lični projekti",
      openSource: "Otvoreni kod",
      workProjects: [
        {
          title: "Platforma za pretragu i analitiku podataka",
          description: "Full-stack veb-aplikacija koja kombinuje Python Django API-je sa AWS OpenSearch-om i React-om za pretragu, analizu i vizualizaciju velikih skupova podataka. Projektovao kompletnu arhitekturu sistema i UI/UX u Figmi.",
        },
        {
          title: "REST API sa AWS integracijom",
          description: "Sveobuhvatan REST API izgrađen sa Django REST Framework-om, koristeći AWS DynamoDB za NoSQL skladištenje, RDS za relacione podatke i S3 za upravljanje fajlovima. Projektovan za skalabilnost i performanse.",
        },
        {
          title: "3D Avatar Chat-bot",
          description: "Interaktivni veb-čet-bot sa dinamičkim 3D avatarom napravljenim u Blender 3D-u i renderovanim u pretraživaču pomoću React Three Fiber-a. Pokreće ga Next.js za serversko renderovanje i optimalne performanse.",
        },
        {
          title: "Rekonstrukcija enterprise platforme",
          description: "Kompletna rekonstrukcija platforme koristeći Angular 19 sa sopstvenim komponentama i PrimeNG integracijom. Uključivala mapiranje i migraciju podataka između dve verzije platforme.",
        },
        {
          title: "Skripte za automatizaciju procesa",
          description: "Kolekcija Python skripti razvijenih za automatizaciju ručnih procesa i poboljšanje efikasnosti tima u razvojnim i operativnim radnim tokovima.",
        },
        {
          title: "GUI za detekciju objekata (YOLO)",
          description: "Unapređen YOLO algoritam za optimizovanu detekciju objekata sa korisnički prijatnom GUI aplikacijom napravljenom u Python-u i Tkinter-u.",
        },
      ],
      personal: [
        {
          title: "PyQt6 MultiSelect ComboBox",
          description: "Objavljeni PyPI paket (7.4K+ preuzimanja) koji pruža bogat multi-select combobox widget za PyQt6. Uključuje Select All, grupne operacije, optimizacije performansi za velike skupove podataka, puno testno pokriće i dokumentaciju na ReadTheDocs.",
        },
        {
          title: "PyRex",
          description: "Python GUI alat za vizuelno testiranje regularnih izraza — offline alternativa za regex101. Izgrađen sa PyQt i re modulom, sa podrškom za uparivanje šablona u realnom vremenu, isticanje rezultata i generisanje Python koda.",
        },
        {
          title: "Portfolio sajt",
          description: "Lični portfolio izgrađen sa Next.js, Tailwind CSS i Framer Motion. Podržava svetlu/tamnu temu, responsivan dizajn i glatke animacije skrolovanja.",
        },
      ],
    },
    experience: {
      label: "Iskustvo",
      title: "Gde sam radio",
      items: [
        {
          role: "Application Management Engineer",
          period: "Maj 2022 — Trenutno",
          location: "Srbija",
          description: "Razvijao REST API-je koristeći Django REST Framework sa AWS DynamoDB, RDS i S3. Kreirao full-stack veb-aplikacije kombinujući Python Django API-je sa AWS OpenSearch-om i React-om za pretragu, analizu i vizualizaciju podataka. Automatizovao ručne procese. Razvio veb-čet-bot sa dinamičkim 3D avatarom koristeći Next.js, Blender 3D i React Three Fiber. Dizajnirao UI/UX za veb-aplikacije u Figmi. Projektovao kompletne platformske sisteme i rekonstruisao platformu koristeći Angular 19 sa sopstvenim komponentama i PrimeNG.",
        },
        {
          role: "PDE laboratorijski (test) inženjer",
          period: "Jan 2021 — Maj 2022",
          location: "Srbija",
          description: "Planirao i sprovodio laboratorijska ispitivanja u skladu sa standardima testiranja. Pratio rezultate testova validacijom tačnosti podataka i interpretacijom nalaza. Učestvovao u kontinuiranom unapređenju ispitne opreme, procedura i radnog toka. Stekao osnovno razumevanje automobilskog standarda kvaliteta IATF 16949:2016.",
        },
        {
          role: "Stažista za mašinsko učenje",
          period: "Jun 2019 — Jul 2019",
          location: "Srbija",
          description: "Unapređivao YOLO algoritam za optimizovanu detekciju objekata kroz analizu i modifikaciju. Razvio korisnički prijatne GUI aplikacije za detekciju objekata koristeći Python i Tkinter.",
        },
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Hajde da radimo zajedno",
      description: "Trenutno sam otvoren za nove mogućnosti i saradnju. Bilo da imate projekat na umu ili samo želite da se povežete, slobodno mi se javite.",
      email: "Email",
      location: "Lokacija",
      locationValue: "Srbija (udaljeno širom sveta)",
      socials: "Društvene mreže",
      sendEmail: "Pošalji mi email",
    },
    footer: {
      rights: "Sva prava zadržana.",
    },
  },
};
