import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const procedencia = z.enum(['observado', 'testimonio', 'por-confirmar']);

const dato = z.object({
  texto: z.string(),
  procedencia: procedencia,
  fuente: z.string().optional(),
  nota: z.string().optional(),
});

const comparsas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/comparsas" }),
  schema: z.object({
    nombre: z.string(),
    grafiaAlterna: z.array(z.string()).optional(),
    activa: z.boolean().default(true),
    fichaCompleta: z.boolean().default(false),
    resumen: z.string(),
    historia: z.array(dato).optional(),
    personajes: z.array(z.object({
      nombre: z.string(),
      cantidad: z.string(),
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
  loader: glob({ pattern: "**/*.md", base: "./src/content/festividades" }),
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
    comparsas: z.array(z.string()),
    fuentes: z.array(z.string()),
  }),
});

export const collections = { comparsas, festividades };
