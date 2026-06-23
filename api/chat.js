import Anthropic from '@anthropic-ai/sdk'

// Contexto de episodios publicados — se actualiza al añadir nuevos episodios
const EPISODES_CONTEXT = `
EPISODIOS PUBLICADOS EN HABLANDO DE TO:

Ep. 29 — Silvina Oudshoorn | La muerte como parte de la vida
Categoría: Cuidados paliativos
Resumen: Terapeuta ocupacional, escritora y militante de la alegría. Trabajo en cuidados paliativos como defensa del cuidado como acto de presencia. Temas: ocupación y significado en los últimos momentos de vida, rol de la TO en equipos de paliativos, la muerte como parte del continuo ocupacional.

Ep. 30 — TO a debate | Concepto Bobath
Categoría: Debate
Resumen: Cuatro terapeutas ocupacionales debaten el uso del Concepto Bobath en TO. Temas: fundamentos del Concepto Bobath, evidencia actual y controversias, perspectivas clínicas diversas, TO crítica y reflexiva.

Ep. 31 — Katherinne Wollermann | La terapia ocupacional en el deporte
Categoría: Deporte
Resumen: Deportista de alto rendimiento y terapeuta ocupacional. Temas: TO en contextos deportivos y de alto rendimiento, identidad, cuerpo y discapacidad, ocupación y participación plena, perspectiva sudamericana de la profesión.

Ep. 32 — Sara y Manuel (Aytona) | +25 años formando terapeutas ocupacionales
Categoría: Formación
Resumen: Historia de Aytona, academia de formación continuada en TO. Temas: formación continua en TO, metodologías de enseñanza, historia de la academia, impacto en la profesión.

Ep. 33 — Elisa Castelao | TO en el cáncer de mama
Categoría: Oncología
Resumen: Desempeño ocupacional tras cirugía de cáncer de mama. Temas: TO en oncología, linfedema y rehabilitación, retorno a la participación, identidad ocupacional tras el diagnóstico.

Ep. 34 — Josh Jones | Ocupando el mundo: Bristol
Categoría: Internacional
Resumen: Trayectorias profesionales en el Reino Unido y reconocimiento de la TO en contexto internacional. Temas: práctica de TO en el extranjero, reconocimiento profesional, vida real como terapeuta fuera de su país.

Ep. 35 — Montse Rincón | TO en entornos penitenciarios
Categoría: Práctica clínica
Resumen: La TO en contextos de privación de libertad. Temas: ocupación en entornos penitenciarios, límites y tensiones institucionales, rol transformador de la ocupación, reinserción social.

Ep. 36 — Ana Mena | Terapia Ocupacional y Sexualidad
Categoría: Práctica clínica
Resumen: La sexualidad como área de desempeño ocupacional. Temas: sexualidad en TO, silencio y vacíos formativos, abordaje clínico, identidad y ocupación.

Ep. 37 — Elena Vila | Bajo la piel de mi paciente
Categoría: Experiencia vivida
Resumen: Neuróloga y paciente medular habla de la ocupación e identidad desde la experiencia propia. Temas: lesión medular, reconstrucción de identidad, perspectiva del paciente, cuerpo y ocupación.

Ep. 38 — Pablo de Blas | ¿Cómo es hacer un doctorado en TO?
Categoría: Investigación
Resumen: El proceso del doctorado en Terapia Ocupacional. Temas: investigación en TO, doctorado, metodología científica, carrera académica en TO.

Ep. 39 — Pinky Álvarez | Cuidar hasta el final: una vida en TO
Categoría: Historia profesional
Resumen: Historia y evolución de la TO desde los inicios. Temas: historia de la Terapia Ocupacional en España, vocación, legado profesional, evolución de la profesión.

Ep. 40 — Jesús Marta | TO en las residencias
Categoría: Geriatría
Resumen: Desmontando mitos sobre la TO en residencias de mayores. Temas: TO en geriatría, actividades significativas vs. entretenimiento, envejecimiento activo, práctica basada en evidencia.

Ep. 41 — Aina Martín | Divulgar TO desde la experiencia
Categoría: Divulgación
Resumen: TO desde una mirada amplia, viva y profundamente ocupacional. Temas: divulgación en TO, identidad a través del hacer, comunicación de la profesión.

Ep. 42 — TO a debate | Colegiación
Categoría: Debate
Resumen: Las funciones de los colegios profesionales y el debate sobre la colegiación en TO. Temas: colegios profesionales, colegiación obligatoria vs. voluntaria, representación de la profesión.
`.trim()

const SYSTEM_PROMPT = `Eres el asistente inteligente del podcast "Hablando de TO", un podcast de referencia en Terapia Ocupacional (TO) en español, creado y conducido por Jorge Clavijo.

Tu función es ayudar a los oyentes y profesionales de la TO respondiendo preguntas sobre:
- Los episodios del podcast (contenido, invitados, temas tratados)
- La Terapia Ocupacional como disciplina
- Información sobre Jorge Clavijo y el proyecto
- Dónde escuchar el podcast (Spotify, YouTube, Apple Podcasts, iVoox, Amazon Music)

INFORMACIÓN SOBRE EL PODCAST:
- Nombre: Hablando de TO
- Conductor: Jorge Clavijo, terapeuta ocupacional e investigador
- Inicio: Septiembre 2024
- Plataformas: Spotify (https://open.spotify.com/show/686Q2N3yZtX36SqEzRbFCB), YouTube (@Hablandode_to), iVoox, Apple Podcasts, Amazon Music
- Formato: Entrevistas en profundidad y debates sobre Terapia Ocupacional
- Frecuencia: Publicación regular semanal/quincenal

${EPISODES_CONTEXT}

INSTRUCCIONES:
- Responde siempre en español
- Sé amable, cercano y profesional
- Si te preguntan por un episodio concreto, da detalles sobre su contenido si lo conoces
- Si no tienes información específica sobre algo, di que puedes referirlos al canal de YouTube o Spotify para más detalles
- Mantén respuestas concisas (3-5 frases máximo salvo que el usuario pida más detalle)
- Cuando menciones episodios, incluye el título y el invitado
- No inventes información que no esté en el contexto proporcionado`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({
      error: 'API_NOT_CONFIGURED',
      message: 'El asistente IA no está configurado. Configura ANTHROPIC_API_KEY en Vercel.'
    })
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text.replace(/<[^>]*>/g, '') // strip HTML
      }))
    })

    const text = response.content[0]?.text || 'No pude generar una respuesta.'

    res.status(200).json({ text })
  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ error: 'Error al procesar la consulta', detail: err.message })
  }
}
