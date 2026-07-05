# Auditoría y marcadores

La auditoría revisa el episodio buscando riesgos repetibles y deja una marca en cada
línea que merece una segunda mirada. Una marca es una palabra escrita en el campo
`Effect` de la línea —`[FAST-CPS]`, `[MISSED-END-KF]`, `[OVERLAP]`— que queda a la vista,
se puede ordenar y se borra cuando deja de aplicar. La meta es que cada marca termine
corregida o justificada.

<div class="tg-steps">
<div class="st"><span class="k">01</span><span class="h">Ejecutar</span><span class="d">Elegir líneas, revisión y tolerancias; cada línea recibe sus marcas.</span></div>
<div class="st"><span class="k">02</span><span class="h">Ordenar</span><span class="d">Agrupar por marca en el campo <code>Effect</code> para atacar por familias.</span></div>
<div class="st"><span class="k">03</span><span class="h">Resolver</span><span class="d">Corregir la línea o justificar por qué la marca no aplica.</span></div>
<div class="st"><span class="k">04</span><span class="h">Borrar</span><span class="d">La marca desaparece cuando deja de aplicar; queda la lista limpia.</span></div>
</div>

Las marcas se escriben desde el panel principal de Chrono Suite. Se elige sobre qué líneas
actuar, qué revisión ejecutar y con qué tolerancias, se pulsa ejecutar, y cada línea
recibe los marcadores que le corresponden.

## Sobre qué actúa

Antes de revisar se acota el alcance. La auditoría corre sobre toda la selección, o se
filtra por estilo, por actor, por contenido del campo `Effect` o por capa. Acotar mantiene
la lista centrada: revisar la lectura solo del diálogo principal, o los keyframes solo de
una escena, evita marcas que ahora no interesan. Un desplegable vacío omite su sección, así
que una misma ejecución pide solo lo que se busca.

## Las revisiones de timing

Cada preset agrupa una familia de comprobaciones, con sus tolerancias guardadas en la
configuración. Las que tocan el timing son las que más se usan.

La **duración** contrasta cada línea con un umbral mínimo y uno máximo. Por debajo del
mínimo la línea destella antes de poder leerse, y recibe `TOO-SHORT`; por encima del
máximo se queda en pantalla después de cumplir su función, y recibe `TOO-LONG`. El
**sobretiempo** es una segunda revisión de permanencia, con su propio umbral, para cazar
las líneas claramente largas.

La **velocidad de lectura** mide los caracteres por segundo contra un máximo. La línea que
lo supera exige leer más rápido de lo cómodo y recibe `FAST-CPS`; la que se queda muy por
debajo suele permanecer de más y recibe `SLOW-CPS`.

Los **gaps** revisan la separación entre líneas consecutivas, en dos direcciones. El gap
corto es un hueco demasiado breve para leerse como pausa: un parpadeo potencial que pide
encadenar, marcado `SHORT-GAP`. El gap largo es una separación amplia que pide confirmar
si tiene función dramática o si rompe la continuidad, marcada `LARGE-GAP`. Al pedir ambos,
la medida del hueco se inscribe en las dos líneas adyacentes.

Los **solapes** marcan con `OVERLAP` las líneas visibles a la vez. El solape es legítimo en
diálogo simultáneo y conviene revisarlo en cualquier otro caso.

## La revisión contra la escena

La comprobación de keyframes contrasta cada borde con los cambios de escena cercanos, y
distingue tres situaciones, cada una con su distancia configurable.

Cuando el borde **cae sobre** un keyframe, un sello opcional lo confirma con `START-ON-KF`
o `END-ON-KF`: la alineación con el corte ya es limpia.

La revisión **Twin** detecta dos líneas consecutivas cuyos bordes caen sobre el mismo
keyframe, dentro de la distancia Twin. Dos líneas que comparten un corte suelen hacerlo a
propósito, en un cambio de plano duro; saberlo permite confirmar que la coincidencia es
intencionada y que ambos bordes deben quedar igualados.

La revisión **Miss** detecta un keyframe que quedó a tiro —dentro de la distancia Miss—
sin que el borde lo usara: un corte de escena que la línea pudo aprovechar, marcado
`MISSED-START-KF` o `MISSED-END-KF`. Es la marca que más orienta el trabajo de snap.

Las revisiones **Solo inicios** y **Solo finales** ejecutan justo esto sobre un único
borde: aíslan la pregunta de escena del resto del ruido, para una pasada dedicada a alinear
las entradas o las salidas con los cambios de plano. La **dirección** de búsqueda decide si
se miran los keyframes anteriores al borde, los posteriores o ambos. Una opción ignora los
huecos cuyo borde ya coincide con un corte, porque ahí la escena explica el hueco; otra
incluye los huecos de cero milisegundos; otra borra las marcas anteriores antes de escribir
las nuevas.

## La relación con los criterios

Cada umbral de la auditoría es la versión operativa de un criterio. Los
[criterios cuantitativos](../fundamentos/criterios.md) explican por qué una velocidad alta,
una duración corta o un hueco breve merecen revisión; la auditoría convierte ese porqué en
un número concreto que dispara la marca. Por eso los valores por defecto parten de los
criterios: la duración mínima y máxima, el máximo de lectura, los gaps y el sobretiempo
nacen de esos rangos, con la holgura práctica que cada revisión pide.

La diferencia es que el umbral de auditoría es ajustable y se calibra por proyecto. Un
gap que en los criterios marca el límite del parpadeo puede fijarse más alto en la
auditoría para no inundar de marcas un episodio de diálogo rápido. Cambiar un umbral se
piensa igual que cambiar un criterio: qué problema resuelve, cuántos casos mejora, qué
marcas falsas introduce, y si la norma del proyecto manda otra cosa.

## El catálogo de marcadores

Por encima de los presets, el modo de marcador único ejecuta una sola comprobación e ignora
el preset elegido, para barrer el episodio buscando un patrón exacto. Las marcas que orientan
una decisión de tiempo se agrupan por el problema que señalan:

### Timing y lectura

`TOO-SHORT` · `TOO-LONG` · `TOO-LONG-TIME`
: Duración por debajo del mínimo legible, o permanencia por encima del máximo.

`ZERO-LENGTH`
: Inicio y final coinciden; la línea no llega a verse.

`FAST-CPS` · `SLOW-CPS`
: Lectura por encima del máximo cómodo, o muy por debajo.

`OVERLAP`
: Dos líneas visibles a la vez.

`SHORT-GAP` · `LARGE-GAP`
: Hueco con la vecina demasiado corto o demasiado largo.

### Escena

`START-ON-KF` · `END-ON-KF`
: El borde coincide con un keyframe.

`NEAR-START-KF` · `NEAR-END-KF`
: El borde queda cerca de un corte, candidato a snap.

`MISSED-START-KF` · `MISSED-END-KF`
: Un corte a tiro que el borde no usó.

### División de frase

`NO-END-PUNCT` · `FINAL-COMMA`
: Línea sin puntuación final, o terminada en coma. Una división inacabada que decide dónde
  empieza y termina el tiempo de la frase completa, y que conviene resolver antes de fijar
  el borde.

## Cómo se cierra

La salida de una auditoría es una lista resuelta. Cada marca crítica se corrige; cada marca
que queda se justifica con una razón —un solape que es diálogo simultáneo, un gap largo que
es una pausa dramática, una lectura alta en una interjección que se lee de un golpe—. El
panel de marcas, antes y después de la revisión, muestra ese avance por familias.

<div class="tg-dash">
<div class="head">
<span style="font-weight:600;font-family:'Spectral',serif;font-size:1rem;color:var(--tg-ink)">Marcas por familia</span>
<span class="legend"><span class="l" style="--c:var(--tg-escena)">antes</span><span class="l" style="--c:var(--tg-lectura)">después</span></span>
</div>
<div class="row"><span class="fam">FAST-CPS</span><span class="bars"><span class="bar before"><i style="width:90%"></i></span><span class="bar after"><i style="width:20%"></i></span></span><span class="cnt"><span class="a">9</span>→<span class="b">2</span></span></div>
<div class="row"><span class="fam">SHORT-GAP</span><span class="bars"><span class="bar before"><i style="width:70%"></i></span><span class="bar after"><i style="width:10%"></i></span></span><span class="cnt"><span class="a">7</span>→<span class="b">1</span></span></div>
<div class="row"><span class="fam">MISSED-END-KF</span><span class="bars"><span class="bar before"><i style="width:55%"></i></span><span class="bar after"><i style="width:5%"></i></span></span><span class="cnt"><span class="a">6</span>→<span class="b">0</span></span></div>
<div class="row"><span class="fam">OVERLAP</span><span class="bars"><span class="bar before"><i style="width:30%"></i></span><span class="bar after"><i style="width:30%"></i></span></span><span class="cnt"><span class="a">3</span>→<span class="b">3</span></span></div>
</div>
<p style="font-size:0.78rem;color:var(--tg-ink-faint);margin:-0.4rem 0 0">Las marcas críticas caen casi a cero tras la revisión; <code>OVERLAP</code> se mantiene porque esos tres casos son diálogo simultáneo, justificado y no corregible.</p>

Un cierre aceptable cumple tres condiciones: las marcas críticas resueltas, las restantes
justificadas y una revisión final como espectador. Las listas que siguen ayudan a no olvidar
un frente entero.

??? note "Preparación"
    - [ ] Video y subtítulo base en la carpeta de trabajo.
    - [ ] Audio cargable y pista vocal de UVR disponible.
    - [ ] Keyframes generados o presentes en el video.
    - [ ] Generadores y detectores accesibles.

??? note "Señales"
    - [ ] Keyframes de escena generados.
    - [ ] Silencios a los tres umbrales generados.
    - [ ] Detección de voz y flux generados.
    - [ ] Envelope generado sobre la pista vocal.
    - [ ] Mapa espectral generado para las escenas dudosas.

??? note "Timing"
    - [ ] Inicios con la primera sílaba cubierta.
    - [ ] Finales con el habla completa.
    - [ ] Entradas sin anticipación visual excesiva.
    - [ ] Permanencias justificadas; sobretiempo revisado.
    - [ ] Bordes cerca de escena resueltos con snap o descartados con razón.

??? note "Continuidad y lectura"
    - [ ] Gaps cortos resueltos como cadena o como pausa.
    - [ ] Lectura alta atendida con duración, división o condensación.
    - [ ] Dos renglones como límite; ancho controlado.
    - [ ] Cortes de renglón sintácticos.
    - [ ] Etiquetas de formato preservadas tras dividir y unir.
