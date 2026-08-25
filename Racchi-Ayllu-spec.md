# racchiayllu.pe — Especificación del MVP

**Proyecto:** Sitio de patrimonio vivo de la Comunidad Campesina Racchi Ayllu
(Huayllabamba, Urubamba, Cusco).
**MVP:** Festividad de la Virgen Asunta + ficha de la comparsa Qapaq Chunchu.
**Autor:** Mikhail — danzante de la comparsa Qapaq Chunchu (2024–2026).
**Fecha de la especificación:** agosto 2026.

---

## 1. Qué es esto y qué no es

El sitio es **el primer registro público de la fiesta de Racchi Ayllu**. Hoy no
existe nada: ni la fecha correcta, ni las comparsas, ni el nombre del pueblo bien
escrito en un buscador. Lo único que circula es un video de 2018 mal etiquetado
como si fuera de Chinchero.

No es un blog de agencia de turismo. No es una enciclopedia. Es **testimonio de
adentro**: alguien que baila en la comparsa escribiendo lo que ve.

De eso se desprende la regla editorial que gobierna todo el sitio:

> **Cada afirmación lleva su procedencia.** Lo observado, lo escuchado y lo que
> falta confirmar se marcan distinto y se ven distinto.

Un sitio que dice "esto todavía no lo sabemos" es más creíble que uno que rellena.

## 2. Alcance

**Entra en el MVP:**
- Portada del sitio (Racchi Ayllu como comunidad, no solo la fiesta)
- Página de la Festividad de la Virgen Asunta: qué es, calendario día por día
- Ficha completa de la comparsa Qapaq Chunchu
- Listado de las 6 comparsas (solo Qapaq Chunchu con ficha desarrollada)
- Página "Cómo se hizo esto" — metodología y fuentes

**No entra ahora, pero la arquitectura lo debe soportar:**
- Fichas de las otras 5 comparsas
- Otras festividades y tradiciones de la comunidad
- Galería de fotos y video
- Traducción al quechua
- Machuqolqa y patrimonio arqueológico

## 3. Stack

- **Astro 5** con content collections tipadas (Zod)
- **Tailwind CSS v4** (config en CSS, sin `tailwind.config.js`)
- Contenido en **Markdown/MDX** — nada hardcodeado en componentes
- **Sin framework de JS de cliente.** Todo estático. Si algo necesita
  interactividad, `<script>` vanilla en la isla que lo requiera
- Deploy en **Cloudflare Pages** o **Netlify** (estático puro, dominio `racchiayllu.pe`)
- `astro-seo` o meta tags manuales + sitemap + JSON-LD

**Estructura i18n desde el día uno**, aunque el MVP salga solo en español:
rutas bajo `/es/`, con redirect de `/` a `/es/`. Agregar `/qu/` después no debe
requerir refactor.

## 4. Problema de posicionamiento (importante)

Existe **Raqchi de San Pedro, Canchis** — el templo de Wiracocha, destino turístico
consolidado. Se va a comer cualquier búsqueda de "Racchi".

Reglas duras:
- Nunca "Racchi" solo en `<title>`, `<h1>` ni URLs
- Siempre el paquete: **Racchi Ayllu — Huayllabamba — Urubamba — Cusco**
- Incluir en el sitio una nota explícita de desambiguación
- JSON-LD tipo `Place` con coordenadas y `containedInPlace` hasta el distrito
- Meta description que mencione Huayllabamba y Urubamba

## 5. Sistema de diseño

### 5.1 De dónde sale la paleta

**No** de la bandera del Cusco ni de piedra inca ni de terracota genérica.
Los colores salen del traje real de la comparsa:

| Token | Hex | De dónde sale |
|---|---|---|
| `--color-suri` | `#E8DCC4` | Pluma de suri. Fondo base del sitio. |
| `--color-chonta` | `#2E2018` | Madera de la chonta. Texto e interfaz. |
| `--color-cinta-azul` | `#1B4F8C` | Cinta azul de las medias. Acento principal. |
| `--color-cinta-rosa` | `#D4547E` | Cinta rosa de las medias. Acento secundario. |
| `--color-naranja` | `#E8792B` | Las naranjas del kacharpariy. Solo para el kacharpariy. |
| `--color-tierra` | `#8B6F४७` | (usar `#8B6F47`) Tierra del camino. Bordes y divisores. |

El azul y el rosa juntos son la firma cromática y **no** aparecen en ningún otro
sitio de folklore cusqueño. Úsalos con confianza: azul dominante, rosa como
contrapunto. No los diluyas hacia pasteles.

El naranja está reservado. Solo aparece en la sección del kacharpariy. Que el
lector lo vea una sola vez en todo el recorrido y signifique algo.

### 5.2 Tipografía

- **Display:** una serif con carácter y contraste alto. Sugerencias: *Fraunces*,
  *Newsreader* o *Instrument Serif*. Evitar Playfair (demasiado vista).
- **Cuerpo:** una sans humanista legible en pantalla pequeña. Sugerencias:
  *Public Sans*, *Source Sans 3*. **No Inter.**
- **Utilitaria:** una mono para etiquetas de procedencia, fechas y numeración de
  mudanzas. Sugerencia: *JetBrains Mono* o *IBM Plex Mono*.

Los términos en quechua (chakiriy, kacharpariy, pabluchas, chunta) van siempre en
**cursiva del display**, con `<abbr>` o tooltip que dé la traducción. Es un detalle
tipográfico que hace de glosario sin necesitar una página de glosario.

### 5.3 El elemento firma

**La barra de procedencia.** Cada bloque de contenido lleva a la izquierda una
barra vertical de 3px cuyo color declara de dónde viene el dato:

- **Azul** (`--color-cinta-azul`) — observado directamente por el autor, 2024–2026
- **Rosa** (`--color-cinta-rosa`) — testimonio de terceros, con fuente nombrada
- **Punteada en tierra** — pendiente de confirmar

Con leyenda visible y fija en la página. Es honestidad metodológica convertida en
elemento visual, y es lo que ningún otro sitio de folklore tiene.

Esa es la única audacia del diseño. Todo lo demás va disciplinado y quieto.

### 5.4 Layout

Columna única, medida de lectura ~68ch, mobile-first de verdad — la mayoría de
comuneros va a entrar desde celular con señal irregular.

El calendario de la fiesta va como **timeline vertical del 21 al 25**, con el 24
visualmente destacado como día central. La numeración 21/22/23/24/25 sí codifica
información real (es una secuencia con orden que importa), así que ahí los
marcadores numéricos están justificados.

### 5.5 Piso de calidad

- Responsive real hasta 360px
- Foco de teclado visible
- `prefers-reduced-motion` respetado
- Contraste AA mínimo sobre el fondo suri
- Imágenes con `loading="lazy"` y dimensiones explícitas
- Peso objetivo: bajo. Es una zona rural con conexión limitada.

## 6. Modelo de contenido

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const procedencia = z.enum(['observado', 'testimonio', 'por-confirmar']);

const dato = z.object({
  texto: z.string(),
  procedencia: procedencia,
  fuente: z.string().optional(),   // obligatorio si procedencia = testimonio
  nota: z.string().optional(),
});

const comparsas = defineCollection({
  type: 'content',
  schema: z.object({
    nombre: z.string(),
    grafiaAlterna: z.array(z.string()).optional(),
    activa: z.boolean().default(true),
    fichaCompleta: z.boolean().default(false),
    resumen: z.string(),

    historia: z.array(dato).optional(),

    personajes: z.array(z.object({
      nombre: z.string(),
      cantidad: z.string(),        // string: "20 aprox", "variable"
      funcion: z.string(),
      procedencia: procedencia,
    })).optional(),

    vestimenta: z.array(z.object({
      pieza: z.string(),
      quechua: z.string().optional(),
      descripcion: z.string(),
      material: z.string().optional(),
      costo: z.string().optional(),
      significado: z.string().optional(),
      procedencia: procedencia,
    })).optional(),

    musica: z.object({
      instrumentos: z.array(z.string()),
      mudanzas: z.array(z.object({
        nombre: z.string().optional(),
        numero: z.number().optional(),
        descripcion: z.string().optional(),
        procedencia: procedencia,
      })),
      procedencia: procedencia,
    }).optional(),

    fuentes: z.array(z.string()),
  }),
});

const festividades = defineCollection({
  type: 'content',
  schema: z.object({
    nombre: z.string(),
    fechaInicio: z.string(),
    fechaFin: z.string(),
    resumen: z.string(),
    dias: z.array(z.object({
      fecha: z.string(),
      nombre: z.string().optional(),
      central: z.boolean().default(false),
      actividades: z.array(z.string()),
      procedencia: procedencia,
    })),
    comparsas: z.array(z.string()),   // slugs
    fuentes: z.array(z.string()),
  }),
});

export const collections = { comparsas, festividades };
```

## 7. Rutas

```
/                        → redirect a /es/
/es/                     → portada de la comunidad
/es/festividades/        → índice
/es/festividades/virgen-asunta/
/es/comparsas/           → las 6, solo una con ficha
/es/comparsas/qapaq-chunchu/
/es/como-se-hizo/        → metodología, fuentes, qué falta
```

---

# 8. CONTENIDO PARA EL MVP

Todo lo que sigue está listo para pasar a Markdown. Revisar antes de publicar.

## 8.1 La comunidad (portada)

Racchi Ayllu es una comunidad campesina del distrito de Huayllabamba, provincia de
Urubamba, Cusco, en el Valle Sagrado. Está sobre la ruta Cusco–Urubamba, a la
altura del kilómetro 35, en la ladera del cerro Wamanmarka, frente a los nevados
de Pumahuanca, Chicón y Wakay Willka.

En su jurisdicción está el sitio arqueológico de **Machuqolqa**, un centro de
almacenamiento prehispánico entre los 3700 y 3800 msnm.

> **Nota de desambiguación, visible en la portada:**
> Esta es Racchi Ayllu, en Huayllabamba, Urubamba. No debe confundirse con Raqchi
> de San Pedro, en la provincia de Canchis, donde está el templo de Wiracocha.

## 8.2 La Festividad de la Virgen Asunta

La Asunción de María — no la Ascensión, que es la de Cristo. La diferencia importa
y conviene aclararla en el texto: la Ascensión es Cristo subiendo al cielo por su
propio poder; la Asunción es María siendo elevada por Dios.

**Lo que hace distinta a esta fiesta: las fechas.** Casi todas las comunidades del
Valle celebran a la Asunta la semana del 15 de agosto. Calca, la más conocida, va
del 15 al 19. **Racchi Ayllu celebra del 21 al 25.**

Por qué, no se sabe. Se ha hecho así desde hace mucho tiempo y nadie recuerda un
cambio. Queda como pregunta abierta del proyecto. `[por-confirmar]`

### Calendario

**21 — Víspera** `[observado]`
Por la tarde la comparsa se concentra en la casa del mayordomo. De ahí se va
bailando hasta la iglesia, se celebra la misa, y bailando se retorna a la casa del
mayordomo.

**22 y 23** `[observado]`
Por la mañana, la misma dinámica: caminando y bailando hacia la misa de las 10.
En la plaza del templo se hace una procesión corta — se saca a la Virgen y a los
santos, y se reza en las cuatro esquinas de la plaza. Después cada comparsa
presenta sus pasos, en orden de llegada a la iglesia.

Alrededor de las seis de la tarde se vuelve a misa. Es la manera de darle las
buenas noches a la Virgen, y se hace todos los días. Luego se regresa a la casa
del mayordomo, donde hay comida, bebida y música para los danzantes.

**24 — Día central** `[observado]`
Después de la misa sale la procesión mayor. En vez de las cuatro esquinas de la
plaza, se reza en distintos puntos del pueblo: un recorrido de cuatro o cinco
kilómetros por las calles principales.

En un cruce de cuatro carreteras se recibe la bendición de la Virgen Asunta, y ahí
mismo los mayordomos del año entregan el cargo a los del año siguiente, delante de
todos.

De vuelta en la iglesia se hace la presentación final — la que sí hay que bailar
con todo. Por la noche, la despedida, y a la casa del mayordomo.

**25 — Kacharpariy** `[observado]`
El día transcurre como el 22 y el 23. Por la noche viene el kacharpariy.

En nuestra comparsa hay una tradición propia: los danzantes se forman en dos
columnas, frente a frente, y se tiran naranjas. Después cada uno se quita la
vestimenta de la danza y se queda con su short y su polo. Ahí termina todo.

### Las comparsas

Seis salen en la fiesta: Kukasaru, Qhapaq Qolla, Tinkus, Saqsampillos, Alvaso
(comparsa nueva, de los cohetillos y fuegos artificiales) y Qapaq Chunchu.

Si hay un orden de precedencia entre ellas, está por confirmar. `[por-confirmar]`

## 8.3 Ficha: Comparsa Qapaq Chunchu

### Historia

La comparsa no vino de fuera. Antes de 2011 la comunidad bailaba el **Iriji
Chunchu**. Ese año, por iniciativa del señor **Velasco Quispe Cusihuamán**, la
danza pasó a Qapaq Chunchu, y con el cambio se cambió también la vestimenta.
`[testimonio]`

Qué era exactamente el Iriji Chunchu, cómo se bailaba y desde cuándo existía, no
está documentado aquí. `[por-confirmar]`

Entre 2020 y 2023 la comparsa no salió, por la pandemia. Volvió en 2024 y ha
salido cada año desde entonces. `[observado]`

**Línea de tiempo:**
`2011` transformación · `2011–2019` continuidad · `2020–2023` sin salir ·
`2024` retorno · `2025–2026` continuidad

### Personajes `[observado]`

| Personaje | Cantidad | Función |
|---|---|---|
| Rey (también caporal) | 1 | Dirige los pasos y marca la entrada de cada melodía |
| Caporales | 2 | Guían a los danzantes, cuidan las posiciones y dirigen el recorrido |
| Danzantes | ~20 | Ejecutan los pasos que se les indica |
| Pabluchas | ~3 | Bailan por todos lados, sin orden estricto |

**El baile no es continuo, es intermitente.** Va por melodías. El Rey marca al
inicio de cada una en qué tiempo entrar, para que todos arranquen igualados.

**Diferencia con el modelo conocido:** en el Qhapaq Chunchu de Paucartambo el
personaje cómico es el *kusillo*, el mono. En Racchi Ayllu son **pabluchas** —
ukukus, osos — que pertenecen al mundo de Qoyllur Rit'i. No es lo mismo.
`[observado]`

Antes había un personaje de oso con traje alquilado. Ya no sale. `[testimonio]`

### Cómo se entra y cómo se dirige `[observado]`

No hay reglamento escrito. Para entrar basta con querer, tener ganas y tener
tiempo. Se puede bailar viviendo fuera de la comunidad.

El número de danzantes es variable: cada quien viene los días que puede. Esa
flexibilidad es parte de cómo funciona la comparsa, no una falla — permite que
sigan bailando los que trabajan o migraron.

La comparsa siempre ha sido de hombres. Nunca han bailado mujeres.

El caporal designa como sucesor a quien considera más apto, y deja el cargo cuando
decide dejarlo.

Los ensayos empiezan una o dos semanas antes, en la casa del mayordomo.

### Vestimenta `[observado, salvo lo marcado]`

De la cabeza a los pies: **máscara**, **cabellera**, **pamisa** (lo que va en la
cabeza), **banda**, **pechera**, **falda**, **medias blancas** hasta la rodilla con
cintas azules y rosadas encima, y la **chunta** — el palo de madera que representa
la lanza.

Este año se usaron además **braceras**, parecidas a las bandas de capitán de
fútbol pero con plumas.

Las plumas son de **suri**, según me dijeron. `[testimonio]` Si se confirma, es un
dato notable: el suri es ave de puna, y la danza representa a un guerrero de selva.

**Cambio documentado:** antes se bailaba con zapato negro; ahora se usa zapatilla
azul. `[observado]`

**Cómo se consigue:** cada danzante manda a confeccionar su traje según sus
recursos, y algunos alquilan. Quien se manda a hacer uno nuevo suele dejar el
antiguo a la comparsa, para prestárselo a niños o jóvenes que no tienen. Cuando
alguien deja de bailar, a veces también deja su traje para lo mismo. `[observado]`

Referencia de costo: unos 300 soles por falda, pechera, banda y pamisa.
`[testimonio]`

De chuntas hay bastantes — no hace falta mandar a fabricar cada año. `[observado]`

Qué significa cada pieza, de qué material es exactamente, y si la corona tiene algo
propio de Racchi frente al modelo de Paucartambo: `[por-confirmar]`

### Música y mudanzas

Acompañan **quenas, bombo y caja**. Cada mayordomo contrata a los músicos según
sus recursos o sus contactos. `[observado]`

El paso común se llama **chakiriy**: se usa tanto para caminar como para entrar a
danzar. Las demás mudanzas van por número, sin nombre propio. `[observado]`

Qué representa cada una, en qué momento va cada una, quién compuso las melodías:
`[por-confirmar]`

No hay cantos.

### Organización

El mayordomo es del pueblo. El cargo se ofrece o se pide, y llevarlo es una gran
honra. Se compromete a organizar todo — comida, bebida, banda — y el resto de
danzantes se compromete a acompañarlo en sus actividades. `[testimonio]`

El mayor gasto lo asume el mayordomo. Los danzantes cubren el alquiler o la
confección de sus implementos. `[observado]`

### Qué preocupa

Que no aparezca mayordomo para el año siguiente, y que no entren nuevos
integrantes. El número de danzantes se ha mantenido casi igual. Algunos de los que
migraron a Cusco o a Lima siguen volviendo a bailar. `[testimonio]`

> "Es una danza que se baila con amor, con devoción."

## 8.4 Cómo se hizo esto

Página corta y honesta. Debe decir:

- Quién escribe y desde dónde: danzante de la comparsa, 2024–2026
- Qué significa cada color de la barra de procedencia
- Que el material inicial es observación propia, no entrevista formal, y que la
  entrevista al caporal está pendiente
- La lista de preguntas abiertas del proyecto:
  - Por qué la fiesta es del 21 al 25 y no la semana del 15
  - Qué era el Iriji Chunchu y desde cuándo existía
  - Los caporales anteriores, en orden
  - El significado de cada pieza de la vestimenta
  - Los nombres de las mudanzas y su orden
- Invitación a corregir: un correo o un contacto para que cualquier comunero
  aporte o enmiende
- Que las otras cinco comparsas están pendientes de documentar

---

# 9. PROMPT PARA CLAUDE CODE

> Copiar de aquí abajo, junto con este documento completo como contexto.

```
Vas a construir racchiayllu.pe, el primer registro público de la Comunidad
Campesina Racchi Ayllu (Huayllabamba, Urubamba, Cusco). Trabajas con la
especificación adjunta. Léela completa antes de escribir código.

Contexto que cambia cómo debes trabajar: no hay diseño previo, no hay contenido
que migrar, y yo — el autor — soy danzante de la comparsa que se documenta. El
sitio no es un blog de turismo: es testimonio de adentro, y la trazabilidad de
cada dato es el punto, no un adorno.

ORDEN DE TRABAJO

1. Antes de tocar código, muéstrame un plan de diseño corto: paleta con los hex
   de la sección 5.1, las tres familias tipográficas que propones con su
   justificación, y un wireframe ASCII de la portada y de la ficha de comparsa.
   Espera mi aprobación.

2. Andamiaje: Astro 5 + Tailwind v4, content collections con el esquema de la
   sección 6 tal cual, rutas de la sección 7, estructura i18n con /es/ desde ya
   aunque solo exista español.

3. Sistema de diseño en CSS: tokens de color y tipografía como variables. Nada de
   valores sueltos en los componentes.

4. Componente ProcedenciaBloque — el elemento firma. Barra vertical de 3px a la
   izquierda: azul para observado, rosa para testimonio, punteada en tierra para
   por-confirmar. Con leyenda fija y accesible en la página.

5. Contenido de la sección 8 en Markdown, respetando las marcas de procedencia.
   No inventes datos para rellenar huecos: donde dice por-confirmar, se queda como
   por-confirmar y se muestra como tal.

6. SEO y desambiguación de la sección 4. Esto no es opcional: si el sitio no gana
   la búsqueda frente a Raqchi de Canchis, no sirve de nada.

RESTRICCIONES

- Mobile-first real, hasta 360px. Zona rural, conexión limitada, peso bajo.
- Sin framework de cliente. Estático puro.
- Cero contenido hardcodeado en componentes. Todo desde content collections.
- No uses fondo crema con serif de alto contraste y acento terracota. Ese es el
  look por defecto que produce cualquier IA y no es este proyecto. La paleta sale
  del traje real de la comparsa: pluma de suri, chonta, cinta azul, cinta rosa.
- El naranja del kacharpariy aparece UNA sola vez en todo el sitio. No lo repartas.
- Los términos en quechua van en cursiva del display, con su traducción accesible.

CUANDO TERMINES

Dime qué quedó pendiente y qué decisiones tomaste que yo debería revisar. Si algo
de la especificación te pareció mal resuelto, dilo en vez de implementarlo tal
cual.
```

---

## 10. Pendientes antes de publicar

- [x] Confirmar si la fiesta es 21–25 fijo o si la víspera se mueve con la semana.
    La fiesta es 21 al 25 de agosto.
- [ ] Nombre y procedencia de la banda de músicos
No importa. 
- [ ] Verificar la grafía de "pamisa" y "Iriji"
Si es, Pamisa es la prenda encima de la cabeza que tiene plumas e Iriji viene de la palabra Hereje, aunque al pronunciarlo se convierte en Iriji.
- [ ] Confirmar el dato de las plumas de suri
Si son de suri.
- [ ] Fotos de detalle de cada pieza de la vestimenta
Tengo una foto general de la comparsa con terno y otra de mi con la vestimenta.