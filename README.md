# racchiayllu.pe

Sitio de patrimonio vivo de la **Comunidad Campesina Racchi Ayllu** (Huayllabamba,
Urubamba, Cusco).

Es el primer registro público de la fiesta de Racchi Ayllu. No es un blog de
agencia de turismo ni una enciclopedia: es testimonio de adentro, escrito por un
danzante de la comparsa Qapaq Chunchu (2024–2026).

## Regla editorial

> **Cada afirmación lleva su procedencia.**

Todo dato se marca como `observado`, `testimonio` o `por-confirmar`, y cada
marca se ve distinto en el sitio. Lo que no se sabe se dice que no se sabe: el
tipo `procedencia` está en el esquema Zod de las colecciones, así que no se
puede publicar un dato sin declarar de dónde viene.

## Alcance del MVP

- Portada de la comunidad
- Festividad de la Virgen Asunta (21 al 25 de agosto), día por día
- Ficha completa de la comparsa Qapaq Chunchu
- Listado de las 6 comparsas (solo Qapaq Chunchu con ficha desarrollada)
- Página "Cómo se hizo esto" — metodología, fuentes y preguntas abiertas

Pendiente, pero soportado por la arquitectura: fichas de las otras 5 comparsas,
otras festividades, galería, traducción al quechua, Machuqolqa.

Especificación completa en [`Racchi-Ayllu-spec.md`](./Racchi-Ayllu-spec.md).

## Stack

- **Astro 7** con content collections tipadas (Zod)
- **Tailwind CSS v4** (configuración en CSS, sin `tailwind.config.js`)
- Contenido en **Markdown** — nada hardcodeado en componentes
- Sin framework de JS de cliente: todo estático, `<script>` vanilla donde haga falta
- **pnpm** (Node >= 22.12)

Rutas bajo `/es/` desde el día uno, con redirect de `/` a `/es/`, para que
agregar `/qu/` después no requiera refactor.

## Estructura

```text
/
├── public/                     favicon, imagen y video de la comparsa
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── ProcedenciaBloque.astro     bloque de dato con su marca de origen
│   │   └── ProcedenciaLeyenda.astro    leyenda de los tres tipos de procedencia
│   ├── content/
│   │   ├── comparsas/                  qapaq-chunchu.md
│   │   └── festividades/               virgen-asunta.md
│   ├── content.config.ts               esquemas Zod de ambas colecciones
│   ├── layouts/Layout.astro
│   ├── pages/
│   │   ├── index.astro                 redirect a /es/
│   │   └── es/
│   │       ├── index.astro             portada
│   │       ├── como-se-hizo.astro
│   │       ├── contacto.astro
│   │       └── festividades/
│   │           ├── [id].astro
│   │           └── [festividad]/comparsas/{index,[id]}.astro
│   ├── scripts/motion.js
│   └── styles/global.css
├── Racchi-Ayllu-spec.md        especificación del MVP
└── Encuesta.md                 material de campo
```

## Comandos

| Comando        | Acción                                          |
| :------------- | :---------------------------------------------- |
| `pnpm install` | Instala dependencias                            |
| `pnpm dev`     | Servidor local en `localhost:4321`              |
| `pnpm build`   | Compila el sitio a `./dist/`                    |
| `pnpm preview` | Previsualiza el build antes de desplegar        |
| `pnpm astro …` | CLI de Astro (`astro add`, `astro check`, …)    |

## Agregar contenido

Una comparsa o festividad nueva es un archivo `.md` en la carpeta que le
corresponde dentro de `src/content/`. El frontmatter debe cumplir el esquema de
[`src/content.config.ts`](./src/content.config.ts); el build falla si falta un
campo o si un dato no declara su `procedencia`. El cuerpo del Markdown es la
nota en prosa que acompaña a la ficha.

## Colaborar

¿Eres comunero y quieres aportar o corregir algo?
Escribe a [contacto@racchiayllu.pe](mailto:contacto@racchiayllu.pe).
