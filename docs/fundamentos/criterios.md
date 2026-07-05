# Criterios cuantitativos

Los números marcan rangos de revisión. Un valor fuera de rango señala una línea que
conviene mirar otra vez, y la prioridad de fondo sigue siendo la lectura, la voz, la escena
y la continuidad. Los números avisan de dónde puede haber un problema; el juicio sobre la
frase concreta lo resuelve.

## Cuánto tiempo pide la lectura

La velocidad de lectura se mide en caracteres por segundo. Por encima de unos 20, la línea
empieza a exigir más rapidez de la cómoda, y la salida suele ser dividir o condensar antes
que estirar. Por debajo de unos 7, la línea permanece más de lo que su texto justifica, y
conviene comprobar si sigue en pantalla después de cerrar la voz.

La duración tiene dos extremos. Una línea por debajo de unos 700 a 833 milisegundos
destella: aparece y desaparece antes de que el ojo la fije. Una línea por encima de unos
5500 milisegundos corre el riesgo de quedar como texto muerto, presente mucho después de
haberse leído. Entre esos extremos, la duración correcta es la que da tiempo a leer sin
sobrar.

La composición acompaña a la duración. Una línea de más de unos 42 caracteres pesa al
leerse y pide renglonarse o dividirse, y dos renglones son el límite normal: un tercer
renglón carga la lectura y casi siempre indica que sobra texto o falta una división.

## Cuánto aire piden los bordes

El aire de entrada —el lead-in— ronda los 80 a 150 milisegundos, lo justo para que el ojo
encuentre el texto antes de la voz —las pasadas automáticas parten del tramo alto de ese
rango—, y puede ampliarse hasta unos 400 cuando la entrada es suave o el texto denso. El aire de salida —el lead-out— es mayor, de unos 350 a 420
milisegundos, porque la lectura termina después del habla, y se estira hasta unos 800 en
cierres lentos o frases exigentes. Esa diferencia entre los dos bordes nace del desfase
entre el fin de la voz y el fin de la lectura.

La distancia entre líneas tiene su propio rango. Un hueco de unos 80 milisegundos cae en
zona de parpadeo y pide decidir entre encadenar o conservar la pausa. Un hueco de más de un
segundo largo, hacia los 1200 milisegundos, es una pausa que pide confirmar su intención. Y
un borde ya colocado resiste los microajustes dentro de unos 250 milisegundos, para que un
keyframe casi encima no arrastre un límite que ya estaba bien.

<div class="tg-zone">
<div class="band">
<span class="z flicker" style="flex:0 0 18%">parpadeo</span>
<span class="z pause" style="flex:1">pausa útil</span>
<span class="z check" style="flex:0 0 26%">confirmar intención</span>
</div>
<div class="ticks"><span style="left:1%">0</span><span style="left:18%">80 ms</span><span style="left:74%">1200 ms</span></div>
</div>

## Por qué se piensa en fotogramas

El snap es una decisión visual, y lo visual ocurre en fotogramas. Un mismo valor en
milisegundos pesa distinto según el framerate: a 24 fotogramas por segundo cada cuadro dura
unos 42 milisegundos, y dos rondan los 83; a 25 fotogramas, cada cuadro son 40 milisegundos
exactos, y dos, 80; a 30, cada cuadro baja a unos 33. Por eso la ventana de snap se piensa
en cuadros y se expresa en cuadros: «dos fotogramas» se mantiene estable mientras «80
milisegundos» cambia de significado con el material.

| Framerate | Un cuadro | Dos cuadros |
| --- | --- | --- |
| 24 fps | ≈42 ms | ≈83 ms |
| 25 fps | 40 ms | 80 ms |
| 30 fps | ≈33 ms | ≈67 ms |

## Del criterio a la marca

Estos rangos viven dos veces. Aquí son criterio: el porqué de que una velocidad alta o una
duración corta merezcan revisión. En la [auditoría](../tecnica/auditoria.md) son umbral:
el número concreto que dispara una marca cuando una línea se sale. Los valores por defecto
de la auditoría parten de estos criterios, y se ajustan por proyecto cuando una escena o una
norma piden otra cosa.

Cambiar un umbral pide pensarlo. Antes conviene saber qué problema resuelve el cambio,
cuántos casos mejora de verdad, qué marcas falsas introduce, si aplica a toda la obra o solo
a una escena, y si conserva el orden de prioridad entre lectura, voz, escena y continuidad.
Un umbral que mejora una escena a costa de ensuciar el resto del episodio sale caro, y la
norma del proyecto, cuando define rangos más estrictos, manda sobre estos valores de
partida.
