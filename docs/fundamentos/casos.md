# Casos de decisión

Los casos que siguen son las situaciones que más se repiten al timear. Cada uno describe
una condición reconocible, la decisión que la resuelve y la excepción que la matiza.
Todos heredan la misma jerarquía: lo que cambia de un caso a otro es qué plano —voz,
lectura, escena o continuidad— lleva la voz cantante.

## Bordes externos

Un **inicio externo** aparece cuando una línea arranca tras una pausa o tras la toma
anterior, sin nada inmediato que la preceda. La decisión base es colocar el inicio
visible con el lead-in base antes del ataque vocal, de modo que el texto esté listo
cuando suene la primera sílaba. La excepción reduce ese aire cuando el lead-in invadiría
el cierre de una línea anterior o anticiparía una escena que todavía no corresponde: ahí
se entra más justo para no pisar lo que viene de antes.

Un **final externo** aparece cuando la frase cierra una idea completa. La decisión base
es colocar el final visible con el lead-out base después de la voz, para que la lectura
termine con holgura. La excepción cierra antes si un keyframe cercano resuelve mejor la
salida y la lectura ya alcanza, porque un cierre limpio sobre el corte gana al aire
sobrante.

## Bordes contra keyframes

Cuando un corte de escena cae cerca de un borde, la decisión depende de a qué lado del
corte está la voz y de cuánto.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">La voz termina poco antes del keyframe</span>
<div class="lane">
<span class="seg voz" style="left:10%;width:48%">voz · «Llegamos tarde otra vez.»</span>
<span class="seg hold" style="left:58%;width:20%"></span>
<i class="kf" style="left:78%"></i>
</div>
<div class="scale"><span class="v" style="left:58%">fin de voz</span><span class="e" style="left:78%">keyframe</span></div>
<div class="tg-keys">
<b class="k-voz">voz</b>
<b class="k-aire">el final se estira hasta el corte</b>
<b class="k-escena">cierre limpio sobre el keyframe</b>
</div>
<span class="cap">Si la voz termina unos 150 ms antes de un keyframe, el final cierra en el corte aunque quede por debajo del lead-out base: el corte visual absorbe parte del aire de lectura.</span>
</figure>

Si la **voz termina unos 150 ms antes de un keyframe**, el final se cierra en el
keyframe. Esto permite quedar por debajo del lead-out base, porque el corte visual
cercano absorbe parte del aire de lectura que se pierde. La excepción mantiene más
lead-out cuando la lectura no alcanzaría con ese cierre adelantado.

Si la **voz cruza el keyframe por un margen breve**, cercano a 150 ms después, el final
todavía puede cerrar en el keyframe, siempre que el tramo posterior sea perceptivamente
mínimo y la lectura ya alcance. Aquí el cierre visual controla el desbordamiento hacia la
toma siguiente, y la cola que queda tras el corte apenas modifica la comprensión. La
excepción conserva el final de voz cuando ese tramo posterior contiene una palabra
completa o información nueva: entonces la voz pesa más que el corte.

Si la **primera sílaba cae justo antes de un keyframe**, la decisión es cubrir esa
sílaba, porque la sincronía del inicio no se sacrifica por un corte cercano. La escena se
revisa después de cubrir el ataque, y solo si separa dos unidades de sentido distintas se
plantea dividir.

Si el **keyframe cae dentro de la frase hablada**, la línea se mantiene mientras la unidad
de sentido continúe por encima del corte. La excepción divide cuando el corte marca de
verdad una nueva idea, un nuevo hablante o un nuevo foco: ahí el cambio de plano coincide
con un cambio de contenido y conviene darle líneas separadas.

## Escena contra lead-out

Cuando el **lead-out base entraría en la toma siguiente**, la decisión es recortar al
keyframe, siempre que la voz y la lectura ya hayan cerrado. Dejar el texto desbordando
hacia una imagen que cambió de foco distrae más de lo que el aire extra aporta. La
excepción mantiene el aire cuando recortar produciría una salida de lectura demasiado
brusca: la legibilidad sigue por encima del corte.

## Continuidad y huecos

Un **hueco corto** entre dos líneas, perceptible como parpadeo, se cierra con una cadena
si los márgenes máximos lo permiten. La relación entre las dos frases ayuda a confirmar la
decisión: si encadenarlas mantiene la claridad, el parpadeo desaparece. La excepción
conserva el hueco cuando la pausa tiene intención, o cuando encadenar generaría una
permanencia excesiva en la línea anterior.

El caso límite es un **hueco de unos 80 ms con pausa expresiva**: está en pleno rango de
parpadeo, pero la escena usa ese silencio para comunicar. Ahí se conserva el hueco si el
silencio dice algo, y solo se encadena si el parpadeo distrae más de lo que la pausa
aporta. Es una de las decisiones donde el oído narrativo manda sobre la regla técnica.

## Lectura

Una **línea corta con velocidad de lectura alta** —una expresión breve con un CPS por
encima del rango normal— se acepta tal cual cuando se lee de inmediato y contiene
información familiar o muy breve. El número alarma, pero una interjección o una frase
hecha se procesan de un golpe. La excepción extiende, divide o condensa cuando esa línea
rápida sí aporta datos importantes que el espectador necesita tiempo para asimilar.

<div class="tg-cue">
<span class="tc">0:01:12.00 <span class="arrow">→</span> 0:01:12.50</span>
<span class="line">¡Corre, que nos vamos!</span>
<span class="meta"><span class="tag warn">FAST-CPS · 32</span><span class="tag ok">se lee de un golpe</span></span>
</div>

## Texto

Una **frase larga con una pausa sintáctica clara** invita a dividir después de la coma,
siempre que ambos lados conserven sentido propio. La excepción la mantiene unida cuando
dividir crearía una cadena de continuaciones o tiempos demasiado cortos: el remedio no
debe salir peor que la enfermedad.

## Elementos visuales

Un **cartel o rótulo** depende de su presencia en imagen, así que se timea por la
aparición y la desaparición del elemento. La excepción
ajusta por lectura cuando el cartel permanece tan poco que no daría tiempo a leerlo: ahí
la legibilidad vuelve a imponerse sobre la fidelidad a la imagen.
