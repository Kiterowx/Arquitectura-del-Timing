# Herramientas y flujo de trabajo {#tools-and-workflow}

Estas herramientas permiten preparar audio, obtener mediciones y ajustar subtítulos. Puedes empezar con timing manual en Aegisub e incorporar automatización donde ahorre trabajo repetitivo.

| Trabajo | Herramienta | Dónde se ejecuta |
| --- | --- | --- |
| Separar las voces de la música y los efectos. | UVR, Demucs o Audio Separator | Fuera de Aegisub. |
| Generar la onda y los archivos de análisis. | Chrono Generators | BAT de Windows y Python. |
| Ajustar eventos seleccionados. | Chrono Suite | Automation de Aegisub. |
| Editar tiempos sobre una onda. | SubWave | En el navegador. |

Empieza por el [flujo de un episodio](flujo.md) o ve al paso que necesitas:

1. [Preparar las vocales](vocales.md): elegir la pista, separar voces y comprobar la sincronía.
2. [Generar señales](generadores.md): instalar los requisitos de los archivos que vas a usar.
3. [Ejecutar Auto Timing](motor.md): elegir Lazy, Busy o Legacy y cargar sus archivos.
4. [Aplicar post-timing](postprocesado.md): añadir aire, encadenar y ajustar a cortes.
5. [Auditar el resultado](auditoria.md): resolver las marcas y ver el episodio.

Lazy necesita una onda JSON y funciona sin modelos VAD. Busy y Legacy requieren `kite.Timing`. Consulta la [tabla de requisitos](generadores.md#requirements) antes de instalar dependencias.

Para editar texto, ve a [dividir y unir eventos](division-lineas.md). Para los cálculos de detección, consulta [algoritmos](../algoritmos/index.md).
