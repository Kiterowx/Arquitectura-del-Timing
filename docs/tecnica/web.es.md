# Waveform JSON y SubWave {#waveform-json-and-subwave}

La misma onda JSON sirve para la detección de Lazy y para un editor visual. En el navegador, ofrece una referencia visual para inspeccionar un borde propuesto o corregir el timing bruto. Para escuchar, hay que cargar también el audio.

## Qué guarda el JSON {#what-the-json-stores}

El generador guarda mínimos y máximos de bloques breves de audio a varias resoluciones. El editor elige una escala según el zoom, de modo que puede dibujar una frase o un pasaje largo sin representar cada muestra.

Este fragmento de 4 ms contiene dos niveles. Cada array `peaks` alterna valores mínimos y máximos:

```json
{
  "type": "waveform",
  "version": 1,
  "sampleRate": 48000,
  "channels": 1,
  "bits": 16,
  "amplitudeFormat": "s16",
  "amplitudeMin": -32768,
  "amplitudeMax": 32767,
  "pointLayout": "interleavedMinMax",
  "durationMs": 4,
  "totalSamples": 192,
  "levels": [
    {
      "scale": 1,
      "pointMs": 1,
      "samplesPerPoint": 48,
      "points": 4,
      "peaks": [-1200, 1400, -800, 900, -600, 760, -300, 420]
    },
    {
      "scale": 2,
      "pointMs": 2,
      "samplesPerPoint": 96,
      "points": 2,
      "peaks": [-1200, 1400, -600, 760]
    }
  ]
}
```

| Campo | Significado |
| --- | --- |
| `pointMs` | Tiempo cubierto por cada par mínimo/máximo. |
| `samplesPerPoint` | Muestras resumidas por ese par. |
| `points` | Número de pares del nivel. |
| `peaks` | Amplitudes mínimas y máximas intercaladas. |
| `amplitudeMin` / `amplitudeMax` | Rango de amplitud usado para escalar el dibujo. |

El nivel base del generador es de 1 ms a 48 kHz: 48 muestras por punto. Los niveles siguientes duplican la escala. Una resolución fina muestra ataques breves, pero el dibujo necesita el audio para identificar qué produce cada pico. Los extremos guardados no permiten reconstruir ni reproducir el sonido original.

## Leer la onda con el audio {#read-the-contour-with-the-audio}

El ataque, el cuerpo sostenido y la caída pueden orientar el inicio y el final de una frase. La respiración, la música y los residuos de separación pueden dibujar contornos parecidos. Escucha antes de aceptar el borde. El tiempo de lectura se comprueba por separado; no puede deducirse de la onda.

## Editar en SubWave {#edit-in-subwave}

[SubWave](https://kiterowx.github.io/SubWave-Editor/) carga la onda, dibuja los eventos del subtítulo y permite mover sus bordes. Funciona en un navegador moderno.

1. Carga el `.waveform.json` del episodio.
2. Carga los subtítulos correspondientes en `.ass`, `.ssa` o `.srt`.
3. Carga el audio y elige un evento en la línea de tiempo o en la lista.
4. Escucha el pasaje y arrastra un borde o escribe su tiempo en el panel.
5. Exporta y revisa el resultado antes de sustituir el archivo de trabajo.

La exportación ASS está prevista para conservar cabecera, estilos y campos intactos mientras actualiza los tiempos editados. Abre el archivo exportado en Aegisub y compara esos campos con la copia guardada, especialmente después de convertir texto o formato. SRT pierde el formato específico de ASS.

<figure class="tg-fig"><span class="tg-eyebrow">El episodio cargado en el editor</span><img src="../../../assets/ejemplos/editor-web-episodio-3-vista-general.png" alt="SubWave con onda, lista de subtítulos, audio y panel de edición" loading="lazy"><figcaption>Comprueba que se cargaron todos los eventos y localiza el seleccionado en la línea de tiempo y en el panel.</figcaption></figure>

Este paso resuelve problemas de [timing bruto](../fundamentos/raw-timing.md): una entrada tardía, una sílaba recortada o un final que sigue ruido residual. Los márgenes, el snap y las cadenas se aplican después en Aegisub, con los keyframes y las herramientas de Chrono Suite.

<figure class="tg-fig"><span class="tg-eyebrow">Inspeccionar el borde elegido</span><img src="../../../assets/ejemplos/editor-web-episodio-3-borde-voz.png" alt="Intervalo de subtítulo seleccionado sobre la onda en SubWave" loading="lazy"><figcaption>Amplía para comparar el borde con el ataque o la cola y escucha a velocidad normal antes de exportar.</figcaption></figure>

Lazy y SubWave leen los mismos datos de onda. Esto permite inspeccionar una propuesta automática sobre la señal que la produjo y contrastarla con la voz y el sentido de la frase.
