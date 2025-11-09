<template>
  <div class="page-home">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:wght@700&family=EB+Garamond:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <FullPage class="page-center" background="/story/01.start.png">
      <h1>Maluhia</h1>
      <h2>Wie der Frieden zurück in die Welt kommt</h2>
      <button class="turtle-button" @click.prevent="scrollToNext"></button>
    </FullPage>
    <FullPage background="/story/02.setup.png"/>
    <FullPage class="page-center" background="/story/03.honu.png">
      <h3>In den Tiefen des weiten Ozeans lebte vor langer, langer Zeit die Honu, die alte Meeresschildkröte. Langsam und leise glitt sie durch das Wasser, so still, dass selbst die Wellen innehielten, um ihr zuzusehen.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/04.symbol.png">
      <h3>Die Honu trug auf ihrem Panzer das Symbol von Maluhiia (Fieden) das in uns wächst und sich ausbreitet – von Herz zu Herz, wie eine Welle.“, Man sagt in diesem kraftvollen Zeichen, sei die Erinnerung der Welt verborgen – die Lieder der Ahnen, die Wege der Sterne, das Flüstern der Erde.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/05.jpg">
      <h3>Die uralte Schildkröte liebte ihren blauen Planeten sehr: die Felsen, das Wasser, die Pflanzen, die Tiere… Vor allem liebte sie die Menschen, denn aus den Augen ihrer Kinder lächelte die Liebe des unendlichen Weltengeistes.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/06.jpg">
      <h3>Doch eines Nachts kam der große Schatten und legte sich in die Herzen der Menschen.
Erschrocken sah Honu, dass die Menschen immer unglücklicher wurden, sodass sie ihren Planeten zu hassen begannen und einander mit immer grausameren Kriegen quälten.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/07.jpg">
      <h3>Da beschloss die Honu, zu allen Ufern der Erde zu schwimmen und den Menschen das Licht zurückzubringen.
Sie schwamm Tag für Tag, Nacht für Nacht, Jahr für Jahr.
Sie überquerte Ozeane, sah die Strände vieler Länder, und überall, wo sie vorbeikam, hinterließ sie eine Spur aus Licht.
</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/08.jpg">
      <h3>Dieses Licht verband die Küsten miteinander – so wie Kinder ihre Hände halten, wenn sie einen Kreis bilden.
Und so wurden die Menschen, die Tiere, die Bäume und die Flüsse wieder miteinander verbunden – durch das sanfte Leuchten der Honu.
</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/09.jpg">
      <h3>Manchmal, wenn Stürme tobten und die Wellen hochschlugen, blieb die Honu ganz ruhig.
Sie wusste: Frieden entsteht nicht durch Eile, sondern durch Geduld.
„Aloha“, flüsterte sie in den Wind – und der Wind brachte Liebe und Mitgefühl zu den Herzen der Menschen.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/10.jpg">
      <h3>Wenn die Honu Inseln erreichte, erinnerte sie die Menschen an Lokahi – die Harmonie, die entsteht, wenn alle zusammenstehen wie die Wellen am Ufer.
Und wenn sie weiterzog, hinterließ sie das Geschenk von Pono – das Gleichgewicht, das wie eine Waage den Frieden trägt.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/11.jpg">
      <h3>Und wenn Herzen schwer wurden, wenn Streit oder Kummer die Menschen trennten, dann schwamm die Honu nah an den Strand.
Ihr Atem war tief und warm, und er duftete nach Hoʻoponopono: nach Vergebung, nach Wieder-Heilwerden, nach Zurückfinden zueinander.
</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/12.jpg">
      <h3>So wurde die Honu zur Hüterin des Friedens.
Sie schwamm von Kontinent zu Kontinent, von Volk zu Volk, und überall, wo sie ankam, öffneten sich die Herzen der Menschen.
Sie begannen, ihr eigenes Licht zu entzünden – ein kleines Feuer des Friedens, das in der Dunkelheit leuchtete.
</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/13.jpg">
      <h3>Eines Tages, so erzählt man, werden all diese Lichter zusammenfinden – wie die Sterne am Himmel zu einem einzigen großen Ozean.
Dann wird die Erde selbst leuchten, so hell wie die Sonne, und jeder Mensch wird wissen:
Wir sind verbunden. Wir sind eins.</h3>
    </FullPage>
    <FullPage class="page-center" background="/story/14.jpg">
      <h3>Und noch heute, wenn du am Meer stehst und die Wellen beobachtest, kannst du sie vielleicht sehen – die Honu, wie sie ruhig und still vorbeigleitet.
Und wenn du genau hinhörst, dann hörst du vielleicht ihr Lied:
Das Lied vom Frieden.
Das Lied von Maluhia.</h3>
    </FullPage>
  </div>
</template>

<script setup lang="ts">
import FullPage from '../components/FullPage.vue'

const scrollToNext = () => {
  const pages = document.querySelectorAll('.full-page')
  let activePage = -1
  pages.forEach((page, i) => {
    const rect = page.getBoundingClientRect()
    if(rect.top >= -10 && rect.top <= 10) {
      activePage = i;
      return true
    }
  })
  
  if (activePage >= 0) {
    pages[activePage+1]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
.page-home {
    @qpply w-screen;
    overflow-x: hidden;
    @apply snap-y snap-mandatory h-screen overflow-y-scroll;
}

.page-center {
  @apply flex flex-col items-center justify-center;
  h1 {
    @apply items-center;
    @apply text-9xl;
  }

  h2 {
    @apply text-7xl;
  }

  /*
  h3 {
    @apply text-4xl;
    @apply text-white;
    width: 33vw;
    align-self: flex-start;
    @apply p-8 m-8;
    @apply bg-black/50 rounded-lg;
  }
    */

    /*h3 {
    @apply text-4xl;
    @apply text-white;
    width: 33vw;
    align-self: flex-start;
    @apply p-8 m-8;
    @apply bg-black/50 rounded-lg;
    
    font-family: 'Cormorant Garamond', 'Playfair Display', 'Georgia', serif;
    @apply font-bold;
    @apply leading-relaxed;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8),
                 0 0 20px rgba(255, 215, 0, 0.3);
    @apply backdrop-blur-sm;
    border: 2px solid rgba(255, 215, 0, 0.3);
    }*/

    /*h3 {
    @apply text-4xl;
    @apply text-amber-50;
    width: 33vw;
    align-self: flex-start;
    @apply p-8 m-8;
    @apply bg-gradient-to-br from-purple-900/60 to-indigo-900/60;
    @apply rounded-2xl;
    
    font-family: 'Cinzel', 'Libre Baskerville', serif;
    @apply font-semibold;
    @apply leading-loose;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9),
                 0 0 15px rgba(139, 92, 246, 0.4);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    @apply backdrop-blur-md;
    }*/

    h3 {
    @apply text-5xl;
    @apply text-yellow-50;
    width: 33vw;
    align-self: flex-start;
    @apply p-8 m-8;
    @apply bg-slate-900/30 rounded-xl;
    
    /* Märchen-Styling */
    font-family: 'EB Garamond', 'Crimson Text', 'Times New Roman', serif;
    @apply font-bold italic;
    @apply leading-relaxed;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 1),
                 1px 1px 10px rgba(255, 215, 0, 0.5),
                 -1px -1px 5px rgba(255, 255, 255, 0.1);
    @apply backdrop-blur-md;
    border-left: 4px solid rgba(255, 215, 0, 0.6);
    letter-spacing: 0.02em;
    }
}

.turtle-button {
  background-image: url('/button.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 120px;
  height: 120px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: transparent;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);

  position: absolute;
  right: 50px;
  bottom: 50px;
}

/* Hover animation */
.turtle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

</style>