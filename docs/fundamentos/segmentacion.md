# Segmentación de frases

La segmentación decide cuántas unidades de subtítulo necesita una intervención hablada.
Es la primera decisión del timing, anterior a fijar cualquier borde, porque determina
qué se va a timear. Una unidad bien segmentada reúne tres cosas a la vez: una idea que
se lee como un todo, un tramo de habla con un ataque y un cierre propios, y una carga
de lectura que el espectador sostiene sin esfuerzo. Cuando esas tres coinciden en una
línea, el pegado a la voz se vuelve preciso y el post-timing se vuelve estable.

<div class="tg-cue is-warn">
<span class="tc">0:00:05.10 <span class="arrow">→</span> 0:00:08.40</span>
<span class="line">No lo sé todavía. ¿Tú qué crees?</span>
<span class="meta"><span class="tag bad">MULTI-SENTENCE</span><span class="tag warn">dos ataques en un intervalo</span></span>
</div>
<div class="tg-cue">
<span class="tc">0:00:05.10 <span class="arrow">→</span> 0:00:06.60</span>
<span class="line">No lo sé todavía.</span>
<span class="meta"><span class="tag ok">unidad propia</span></span>
</div>
<div class="tg-cue">
<span class="tc">0:00:06.80 <span class="arrow">→</span> 0:00:08.40</span>
<span class="line">¿Tú qué crees?</span>
<span class="meta"><span class="tag ok">unidad propia</span></span>
</div>

## Qué resuelve segmentar bien

Pegar tiempos funciona mejor cuando cada línea corresponde a una sola emisión hablada
completa. Si una línea contiene dos frases independientes, el intervalo encierra dos
ataques, dos cierres y una pausa interna entre ellos, y ninguno de los dos bordes de la
línea cae sobre un punto natural. La segmentación define esa estructura antes de fijar
límites: deja cada unidad con un inicio audible, un final audible y una intención
legible, que son las condiciones para que el resto del trabajo sea limpio.

Una segmentación clara previene tres problemas concretos. Evita las líneas que empiezan
en una idea y terminan en otra. Evita las permanencias forzadas, donde una línea dura de
más solo para dar tiempo a leer demasiado texto. Y evita los cortes internos donde la
lectura pediría una pausa distinta a la que marca la voz.

## Cuándo separar

La razón para separar es siempre que dos tramos sostienen sentido por su cuenta y
ganarían bordes propios. Eso ocurre de varias maneras.

Por **sentido**, cuando hay dos frases completas que se entienden cada una por
separado, cuando una pausa sintáctica clara divide la línea en dos tramos con
significado propio, o cuando dos ideas avanzan seguidas pero cambia el foco de una a
otra. Por **intención**, cuando el segundo tramo cambia de registro —de pregunta a
respuesta, de afirmación a énfasis, de un foco a otro—, cuando un vocativo funciona como
llamada o reacción independiente, o cuando una interjección lexicalizada cambia el ritmo
o la emoción de lo que sigue. Por **voz**, cuando el audio muestra dos emisiones
habladas claramente distintas, o cuando dos hablantes comparten una línea y la
comprensión depende de marcar el cambio. Por **lectura**, cuando la línea exige tanto
tiempo en pantalla que la única salida razonable es repartir la carga. Y en una frase
interrumpida, el corte cae donde termina la intención audible, aunque la gramática
esperara otro final.

## Cuándo conservar unido

Separar no siempre mejora; a veces fragmenta. Conviene mantener unido cuando la división
costaría más de lo que aporta.

Se conserva unido cuando la segunda parte **depende gramaticalmente** de la primera y
no se entiende sin ella. Cuando separar produciría una **cadena de continuaciones**:
varias líneas seguidas que empiezan como fragmentos incompletos, con esa sensación de
párrafo partido que cansa la lectura. Cuando la división crearía **líneas demasiado
breves**, sin tiempo para leerse. Cuando la actuación funciona como una **sola
emisión**, un único impulso de voz que partir rompería. Y cuando un vocativo, una
muletilla o una enumeración están tan **integrados** en la frase principal que solo la
matizan, sin sostener una idea aparte.

El criterio que zanja las dudas es comparar el coste de cada opción: una línea
sobrecargada pesa, pero una sucesión de fragmentos incompletos pesa más.

## La coma como punto de corte

La coma marca a menudo una pausa útil, y puede ser un buen punto de segmentación cuando
cada lado conserva una intención legible por separado. El riesgo está en abusar de ella:
dividir por cada coma acumula líneas que empiezan como continuación de la anterior, y esa
acumulación produce justo la lectura fragmentada que la segmentación trata de evitar. La
coma divide bien cuando separa dos ideas; divide mal cuando solo separa dos partes de la
misma idea.

## Esperar a que el texto se asiente

Cuando el texto todavía está cambiando —una traducción en curso, un guion sin cerrar—,
conviene posponer las divisiones. La forma final puede alterar la longitud, el orden, la
puntuación y el punto natural de corte, y una segmentación decidida sobre texto
provisional se rehace en cuanto el texto se asienta. La división estable se decide mejor
cuando la frase ya tiene su forma visible definitiva.

La decisión se cierra cuando cada línea contiene una unidad de sentido, una unidad
hablada y una carga de lectura sostenible. Con eso resuelto, el pegado descrito en
[Raw timing](raw-timing.md) tiene dónde apoyarse.
