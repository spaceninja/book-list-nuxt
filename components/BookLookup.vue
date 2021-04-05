<template>
  <div>
    <h2>Look Up a Book</h2>
    <form class="form" @submit.prevent="lookupBook">
      <FormInput v-model="search" label="Search" />

      <FormInput v-model="title" label="Title" />

      <FormInput v-model="author" label="Author Name" />

      <FormInput v-model="isbn" label="ISBN" />

      <div class="form__group form__group--actions form__group--doublewide">
        <button type="submit" class="btn btn-primary">Search</button>
      </div>
    </form>
    <ol v-if="searchResults.length">
      <BookLookupResult
        v-for="book in searchResults"
        :key="book.id"
        v-bind="book.volumeInfo"
        :search-info="book.searchInfo"
        @load="emitLoad"
      />
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      title: '',
      author: '',
      isbn: '',
      searchResults: [
        {
          id: 'XRF1RAAACAAJ',
          volumeInfo: {
            title: 'J.R.R. Tolkien',
            authors: ['J. R. R. Tolkien'],
            publishedDate: '1990-04',
            industryIdentifiers: [
              {
                type: 'ISBN_10',
                identifier: '0345340426',
              },
              {
                type: 'ISBN_13',
                identifier: '9780345340429',
              },
            ],
            averageRating: 4.5,
          },
        },
        {
          id: '9eLCAgAAQBAJ',
          volumeInfo: {
            title: 'The Letters of J.R.R. Tolkien',
            authors: ['J.R.R. Tolkien'],
            publishedDate: '2014-02-21',
            description:
              "This collection will entertain all who appreciate the art of masterful letter writing. The Letters of J.R.R Tolkien sheds much light on Tolkien's creative genius and grand design for the creation of a whole new world: Middle-earth. Featuring a radically expanded index, this volume provides a valuable research tool for all fans wishing to trace the evolution of THE HOBBIT and THE LORD OF THE RINGS.",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780544363793',
              },
              {
                type: 'ISBN_10',
                identifier: '0544363795',
              },
            ],
            pageCount: 512,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=9eLCAgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=9eLCAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'This collection will entertain all who appreciate the art of masterful letter writing. The Letters of J.R.R Tolkien sheds much light on Tolkien&#39;s creative genius and grand design for the creation of a whole new world: Middle-earth.',
          },
        },
        {
          id: 'wRlAAQAAIAAJ',
          volumeInfo: {
            title: 'J.R.R. Tolkien',
            authors: ['John Ronald Reuel Tolkien'],
            publishedDate: '1987',
            industryIdentifiers: [
              {
                type: 'OTHER',
                identifier: 'STANFORD:36105038467408',
              },
            ],
            pageCount: 44,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=wRlAAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=wRlAAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            },
          },
        },
        {
          id: '4OfWWfRDAXcC',
          volumeInfo: {
            title: 'The Silmarillion',
            authors: ['J.R.R. Tolkien'],
            publishedDate: '2012-02-15',
            description:
              "A number-one New York Times bestseller when it was originally published, THE SILMARILLION is the core of J.R.R. Tolkien's imaginative writing, a work whose origins stretch back to a time long before THE HOBBIT. Tolkien considered THE SILMARILLION his most important work, and, though it was published last and posthumously, this great collection of tales and legends clearly sets the stage for all his other writing. The story of the creation of the world and of the the First Age, this is the ancient drama to which the characters in THE LORD OF THE RINGS look back and in whose events some of them, such as Elrond and Galadriel, took part. The three Silmarils were jewels created by Feanor, most gifted of the Elves. Within them was imprisoned the Light of the Two Trees of Valinor before the Trees themselves were destroyed by Morgoth, the first Dark Lord. Thereafter, the unsullied Light of Valinor lived on only in the Silmarils, but they were seized by Morgoth and set in his crown, which was guarded in the impenetrable fortress of Angband in the north of Middle-earth. THE SILMARILLION is the history of the rebellion of Feanor and his kindred against the gods, their exile from Valinor and return to Middle-earth, and their war, hopeless despite all their heroism, against the great Enemy. This second edition features a letter written by J.R.R. Tolkien describing his intentions for the book, which serves as a brilliant exposition of his conception of the earlier Ages of Middle-earth.",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780547951980',
              },
              {
                type: 'ISBN_10',
                identifier: '0547951981',
              },
            ],
            pageCount: 368,
            averageRating: 4.5,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=4OfWWfRDAXcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=4OfWWfRDAXcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'This second edition features a letter written by J.R.R. Tolkien describing his intentions for the book, which serves as a brilliant exposition of his conception of the earlier Ages of Middle-earth.',
          },
        },
        {
          id: 'yl4dILkcqm4C',
          volumeInfo: {
            title: 'The Lord of the Rings',
            authors: ['J.R.R. Tolkien'],
            publishedDate: '2012-02-15',
            description:
              "A PBS Great American Read Top 100 Pick One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins. From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion. When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom. The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider. This new edition includes the fiftieth-anniversary fully corrected text setting and, for the first time, an extensive new index. J.R.R. Tolkien (1892-1973), beloved throughout the world as the creator of The Hobbit, The Lord of the Rings, and The Silmarillion, was a professor of Anglo-Saxon at Oxford, a fellow of Pembroke College, and a fellow of Merton College until his retirement in 1959. His chief interest was the linguistic aspects of the early English written tradition, but while he studied classic works of the past, he was creating a set of his own.",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780547951942',
              },
              {
                type: 'ISBN_10',
                identifier: '0547951949',
              },
            ],
            pageCount: 1216,
            averageRating: 4.5,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=yl4dILkcqm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'This new edition includes the fiftieth-anniversary fully corrected text setting and, for the first time, an extensive new index.',
          },
        },
        {
          id: 'VNsf8Pmd6AEC',
          volumeInfo: {
            title: 'Tales from the Perilous Realm',
            authors: ['J.R.R. Tolkien'],
            publishedDate: '2012-02-15',
            description:
              'Never before published in a single volume, Tolkien’s four novellas (Farmer Giles of Ham, Leaf by Niggle, Smith of Wootton Major, and Roverandom) and one book of poems (The Adventures of Tom Bombadil) are gathered together for the first time. This new, definitive collection of works — which had appeared separately, in various formats, between 1949 and 1998 — comes with an illuminating introduction from esteemed author and Tolkien expert Tom Shippey as well as Tolkein’s most celebrated essay, “On Fairy-stories,” which astutely addresses the relationship between fairy tales and fantasy. The book is the perfect opportunity for fans of Middle-earth to enjoy some of Tolkien’s often overlooked yet most creative storytelling. With dragons and sand sorcerers, sea monsters and hobbits, knights and dwarves, this collection contains all the classic elements for Tolkien buffs of all ages.',
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780547952093',
              },
              {
                type: 'ISBN_10',
                identifier: '0547952090',
              },
            ],
            pageCount: 432,
            averageRating: 3.5,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=VNsf8Pmd6AEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=VNsf8Pmd6AEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'With dragons and sand sorcerers, sea monsters and hobbits, knights and dwarves, this collection contains all the classic elements for Tolkien buffs of all ages.',
          },
        },
        {
          id: 'SSDxnx-ozrUC',
          volumeInfo: {
            title: 'The Children of Húrin',
            authors: ['J.R.R. Tolkien'],
            publishedDate: '2012-02-15',
            description:
              'The Children of Húrin is the first complete book by J.R.R.Tolkien since the 1977 publication of The Silmarillion. Six thousand years before the One Ring is destroyed, Middle-earth lies under the shadow of the Dark Lord Morgoth. The greatest warriors among elves and men have perished, and all is in darkness and despair. But a deadly new leader rises, Túrin, son of Húrin, and with his grim band of outlaws begins to turn the tide in the war for Middle-earth—awaiting the day he confronts his destiny and the deadly curse laid upon him. The paperback edition of The Children of Húrin includes eight color paintings by Alan Lee and a black-and-white map.',
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780547952109',
              },
              {
                type: 'ISBN_10',
                identifier: '0547952104',
              },
            ],
            pageCount: 320,
            averageRating: 4.5,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=SSDxnx-ozrUC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=SSDxnx-ozrUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'The Children of Húrin is the first complete book by J.R.R.Tolkien since the 1977 publication of The Silmarillion.',
          },
        },
        {
          id: '6MCbciiEnboC',
          volumeInfo: {
            title: "J. R. R. Tolkien's the Hobbit",
            authors: ['John Ronald Reuel Tolkien', 'Patricia Gray'],
            publishedDate: '1967',
            industryIdentifiers: [
              {
                type: 'ISBN_10',
                identifier: '0871294273',
              },
              {
                type: 'ISBN_13',
                identifier: '9780871294272',
              },
            ],
            pageCount: 87,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=6MCbciiEnboC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=6MCbciiEnboC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
        },
        {
          id: 'v-7lwcn4kFcC',
          volumeInfo: {
            title: 'Children of Húrin',
            authors: ['John Ronald Reuel Tolkien'],
            publishedDate: '2010',
            description:
              'A fantasy adventure saga set in the early days of Middle-Earth features humans and elves, dwarves and dragons, orcs and dark sorcerers clashing in an epic battle between good and evil.',
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780345518842',
              },
              {
                type: 'ISBN_10',
                identifier: '0345518845',
              },
            ],
            pageCount: 313,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=v-7lwcn4kFcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=v-7lwcn4kFcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'A fantasy adventure saga set in the early days of Middle-Earth features humans and elves, dwarves and dragons, orcs and dark sorcerers clashing in an epic battle between good and evil.',
          },
        },
        {
          id: 'LWQ6DwAAQBAJ',
          volumeInfo: {
            title: 'The Lay of Aotrou and Itroun',
            authors: ['J. R. R. Tolkien'],
            publishedDate: '2017-11-07',
            description:
              'Coming from the darker side of J.R.R. Tolkien\'s imagination, this is an important non Middle-earth work to set alongside his other retellings of existing myth and legend, "The Legend of Sigurd and Gudrún," "The Fall of Arthur," and "The Story of Kullervo."',
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9781328834546',
              },
              {
                type: 'ISBN_10',
                identifier: '1328834549',
              },
            ],
            pageCount: 128,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=LWQ6DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=LWQ6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'Coming from the darker side of J.R.R. Tolkien&#39;s imagination, this is an important non Middle-earth work to set alongside his other retellings of existing myth and legend, &quot;The Legend of Sigurd and Gudrún,&quot; &quot;The Fall of Arthur,&quot; and &quot;The ...',
          },
        },
        {
          id: 'tXGRBgwxAHIC',
          volumeInfo: {
            title: "Caliban's War",
            authors: ['James S. A. Corey'],
            publishedDate: '2012-06-26',
            description:
              "The second book in the NYT bestselling Expanse series, Caliban's War shows a solar system on the brink of war, and the only hope of peace rests on James Holden and the crew of the Rocinante's shoulders. Now a Prime Original series. We are not alone. On Ganymede, breadbasket of the outer planets, a Martian marine watches as her platoon is slaughtered by a monstrous supersoldier. On Earth, a high-level politician struggles to prevent interplanetary war from reigniting. And on Venus, an alien protomolecule has overrun the planet, wreaking massive, mysterious changes and threatening to spread out into the solar system. In the vast wilderness of space, James Holden and the crew of the Rocinante have been keeping the peace for the Outer Planets Alliance. When they agree to help a scientist search war-torn Ganymede for a missing child, the future of humanity rests on whether a single ship can prevent an alien invasion that may have already begun . . .",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780316202275',
              },
              {
                type: 'ISBN_10',
                identifier: '0316202274',
              },
            ],
            pageCount: 624,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=tXGRBgwxAHIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=tXGRBgwxAHIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'The second book in the NYT bestselling Expanse series, Caliban&#39;s War shows a solar system on the brink of war, and the only hope of peace rests on James Holden and the crew of the Rocinante&#39;s shoulders.',
          },
        },
        {
          id: 'yud-foXqGUEC',
          volumeInfo: {
            title: 'Leviathan Wakes',
            authors: ['James S. A. Corey'],
            publishedDate: '2011-06-15',
            description:
              "The first book in the revolutionary New York Times bestselling Expanse series, a modern masterwork of science fiction. Leviathan Wakes introduces Captain James Holden, his crew, and Detective Miller as they unravel a horrifying solar system wide conspiracy that begins with a single missing girl. Now a Prime Original series. Humanity has colonized the solar system - Mars, the Moon, the Asteroid Belt and beyond - but the stars are still out of our reach. Jim Holden is XO of an ice miner making runs from the rings of Saturn to the mining stations of the Belt. When he and his crew stumble upon a derelict ship, the Scopuli, they find themselves in possession of a secret they never wanted. A secret that someone is willing to kill for - and kill on a scale unfathomable to Jim and his crew. War is brewing in the system unless he can find out who left the ship and why. Detective Miller is looking for a girl. One girl in a system of billions, but her parents have money and money talks. When the trail leads him to the Scopuli and rebel sympathizer Holden, he realizes that this girl may be the key to everything. Holden and Miller must thread the needle between the Earth government, the Outer Planet revolutionaries, and secretive corporations - and the odds are against them. But out in the Belt, the rules are different, and one small ship can change the fate of the universe. \"Interplanetary adventure the way it ought to be written.\" - George R. R. Martin The ExpanseLeviathan WakesCaliban's WarAbaddon's GateCibola BurnNemesis GamesBabylon's AshesPersepolis RisingTiamat's Wrath The Expanse Short FictionThe Butcher of Anderson StationGods of RiskThe ChurnThe Vital AbyssStrange DogsAuberon",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780316134675',
              },
              {
                type: 'ISBN_10',
                identifier: '0316134678',
              },
            ],
            pageCount: 592,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=yud-foXqGUEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=yud-foXqGUEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'The first book in the revolutionary New York Times bestselling Expanse series, a modern masterwork of science fiction.',
          },
        },
        {
          id: '9C1hDwAAQBAJ',
          volumeInfo: {
            title: 'The Expanse',
            authors: ['James S.A. Corey'],
            publishedDate: '2018-02-07',
            description:
              'Based on the bestselling books and tying into the hit television series, THE EXPANSE ORIGINS reveals the untold origins of the crew members of The Rocinante. As interplanetary tensions reach an all-time high, the crew of The Rocinante finds themselves at the center of a conflict that threatens to destroy all of human civilization. But before they were heroes, each member of the crew faced moments that would come to define them and brought them one step closer to the ship they now call home.',
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9781613988534',
              },
              {
                type: 'ISBN_10',
                identifier: '1613988532',
              },
            ],
            pageCount: 112,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=9C1hDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=9C1hDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'Based on the bestselling books and tying into the hit television series, THE EXPANSE ORIGINS reveals the untold origins of the crew members of The Rocinante.',
          },
        },
        {
          id: 'Hn41AgAAQBAJ',
          volumeInfo: {
            title: 'Cibola Burn',
            authors: ['James S. A. Corey'],
            publishedDate: '2014-06-17',
            description:
              "The fourth book in the NYT bestselling Expanse series, Cibola Burn sees the crew of the Rocinante on a new frontier, as the rush to colonize the new planets threatens to outrun law and order and give way to war and chaos. Now a Prime Original series. HUGO AWARD WINNER FOR BEST SERIES Enter a new frontier. ​ \"An empty apartment, a missing family, that's creepy. But this is like finding a military base with no one on it. Fighters and tanks idling on the runway with no drivers. This is bad juju. Something wrong happened here. What you should do is tell everyone to leave.\" The gates have opened the way to a thousand new worlds and the rush to colonize has begun. Settlers looking for a new life stream out from humanity's home planets. Ilus, the first human colony on this vast new frontier, is being born in blood and fire. Independent settlers stand against the overwhelming power of a corporate colony ship with only their determination, courage, and the skills learned in the long wars of home. Innocent scientists are slaughtered as they try to survey a new and alien world. The struggle on Ilus threatens to spread all the way back to Earth. James Holden and the crew of his one small ship are sent to make peace in the midst of war and sense in the midst of chaos. But the more he looks at it, the more Holden thinks the mission was meant to fail. And the whispers of a dead man remind him that the great galactic civilization that once stood on this land is gone. And that something killed it. The Expanse Leviathan Wakes Caliban's War Abaddon's Gate Cibola Burn Nemesis Games Babylon's Ashes Persepolis Rising Tiamat's Wrath ​Leviathan Falls The Expanse Short Fiction The Butcher of Anderson Station Gods of Risk The Churn The Vital Abyss Strange Dogs Auberon",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780316217606',
              },
              {
                type: 'ISBN_10',
                identifier: '0316217603',
              },
            ],
            pageCount: 592,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=Hn41AgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=Hn41AgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'But this is like finding a military base with no one on it. Fighters and tanks idling on the runway with no drivers. This is bad juju. Something wrong happened here. What you should do is tell everyone to leave.',
          },
        },
        {
          id: '1VdJlwEACAAJ',
          volumeInfo: {
            title: 'Leviathan Wakes',
            authors: ['James S.A. Corey'],
            publishedDate: '2011-06-15',
            description:
              "The book is the basis for the first season of The Expanse, a new original series premiering on Syfy in December 2015. Leviathan Wakes is James S. A. Corey's first novel in the epic series the Expanse, a modern masterwork of science fiction where humanity has colonized the solar system. Two hundred years after migrating into space, mankind is in turmoil. When a reluctant ship's captain and washed-up detective find themselves involved in the case of a missing girl, what they discover brings our solar system to the brink of civil war, and exposes the greatest conspiracy in human history. The ExpanseLeviathan WakesCaliban's WarAbaddon's GateCibola BurnNemesis Games The Expanse Short FictionThe Butcher of Anderson StationGods of RiskThe ChurnDrive",
            industryIdentifiers: [
              {
                type: 'ISBN_10',
                identifier: '0316129089',
              },
              {
                type: 'ISBN_13',
                identifier: '9780316129084',
              },
            ],
            pageCount: 592,
            averageRating: 3.5,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=1VdJlwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=1VdJlwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'The first book in the landmark Expanse series, now a major television series.',
          },
        },
        {
          id: 'cxNVDgAAQBAJ',
          volumeInfo: {
            title: 'Persepolis Rising',
            authors: ['James S. A. Corey'],
            publishedDate: '2017-12-05',
            description:
              "The seventh book in the NYT bestselling Expanse series, Persepolis Rising finds an old enemy returning home with more power and technology than anyone thought possible, and the crew of the aging gunship Rocinante tries to rally forces against the new invasion. Now a Prime Original series. An old enemy returns. In the thousand-sun network of humanity's expansion, new colony worlds are struggling to find their way. Every new planet lives on a knife edge between collapse and wonder, and the crew of the aging gunship Rocinante have their hands more than full keeping the fragile peace. In the vast space between Earth and Jupiter, the inner planets and belt have formed a tentative and uncertain alliance still haunted by a history of wars and prejudices. On the lost colony world of Laconia, a hidden enemy has a new vision for all of humanity and the power to enforce it. New technologies clash with old as the history of human conflict returns to its ancient patterns of war and subjugation. But human nature is not the only enemy, and the forces being unleashed have their own price. A price that will change the shape of humanity -- and of the Rocinante -- unexpectedly and forever... Persepolis Rising is a breakneck science fiction adventure following the bestselling Babylon's Ashes. The Expanse Leviathan WakesCaliban's WarAbaddon's GateCibola BurnNemesis GamesBabylon's AshesPersepolis RisingTiamat's Wrath The Expanse Short Fiction The Butcher of Anderson StationGods of RiskThe ChurnThe Vital AbyssStrange Dogs",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780316332828',
              },
              {
                type: 'ISBN_10',
                identifier: '0316332828',
              },
            ],
            pageCount: 560,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=cxNVDgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=cxNVDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'The seventh book in the NYT bestselling Expanse series, Persepolis Rising finds an old enemy returning home with more power and technology than anyone thought possible, and the crew of the aging gunship Rocinante tries to rally forces ...',
          },
        },
        {
          id: 'ebD2DwAAQBAJ',
          volumeInfo: {
            title: 'The Iranian Expanse',
            authors: ['Matthew P. Canepa'],
            publishedDate: '2020-11-01',
            description:
              'The Iranian Expanse explores how kings in Persia and the ancient Iranian world utilized the built and natural environment to form and contest Iranian cultural memory, royal identity, and sacred cosmologies. Investigating over a thousand years of history, from the Achaemenid period to the arrival of Islam, The Iranian Expanse argues that Iranian identities were built and shaped not by royal discourse alone, but by strategic changes to Western Asia’s cities, sanctuaries, palaces, and landscapes. The Iranian Expanse critically examines the construction of a new Iranian royal identity and empire, which subsumed and subordinated all previous traditions, including those of Mesopotamia, Egypt, and Anatolia. It then delves into the startling innovations that emerged after Alexander under the Seleucids, Arsacids, Kushans, Sasanians, and the Perso-Macedonian dynasties of Anatolia and the Caucasus, a previously understudied and misunderstood period. Matthew P. Canepa elucidates the many ruptures and renovations that produced a new royal culture that deeply influenced not only early Islam, but also the wider Persianate world of the Il-Khans, Safavids, Timurids, Ottomans, and Mughals.',
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780520379206',
              },
              {
                type: 'ISBN_10',
                identifier: '0520379209',
              },
            ],
            pageCount: 510,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=ebD2DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=ebD2DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'See also Iranian <b>Expanse</b> Aryan Habitation ( Young Av . airiio . šaiiana- ) , 10 , <br>\n379n17 Aryan Lands ( Old Av . airiia- daxiiu- , Young Av . airiia- daińhu- ) , <br>\n379n17 . See also Iranian <b>Expanse</b> “ Aryans , ” 3 , 149 Asaak , 235-36 <br>\nAshurnasirpal II&nbsp;...',
          },
        },
        {
          id: 'RDo5AQAAMAAJ',
          volumeInfo: {
            title: 'The Expanse of Heaven',
            authors: ['Richard Anthony Proctor'],
            publishedDate: '1897',
            industryIdentifiers: [
              {
                type: 'OTHER',
                identifier: 'MINN:31951D00321294A',
              },
            ],
            pageCount: 305,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=RDo5AQAAMAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=RDo5AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              '... yet even viewed in this aspect , there is muck in the moon&#39;s action which may <br>\nhelp to explain the worship once paid to her . The moon has been appointed for <br>\nseasons ; the Almighty spake Let there be Lights Higio in th &#39; <b>expanse</b> of Heaven<br>\n&nbsp;...',
          },
        },
        {
          id: 'A_-zBAAAQBAJ',
          volumeInfo: {
            title: 'Nemesis Games',
            authors: ['James S. A. Corey'],
            publishedDate: '2015-06-02',
            description:
              "The fifth book in the NYT bestselling Expanse series, Nemesis Games drives the crew of the Rocinante apart, and as they struggle to survive, the inner planets fall victim to an enemy's catastrophic plan. Now a Prime Original series. A thousand worlds have opened, and the greatest land rush in human history has begun. As wave after wave of colonists leave, the power structures of the old solar system begin to buckle. Ships are disappearing without a trace. Private armies are being secretly formed. The sole remaining protomolecule sample is stolen. Terrorist attacks previously considered impossible bring the inner planets to their knees. The sins of the past are returning to exact a terrible price. And as a new human order is struggling to be born in blood and fire, James Holden and the crew of the Rocinante must struggle to survive and get back to the only home they have left. Nemesis Games is a breakneck science fiction adventure following the bestselling Cibola Burn. The Expanse Leviathan WakesCaliban's WarAbaddon's GateCibola BurnNemesis GamesBabylon's AshesPersepolis RisingTiamat's Wrath The Expanse Short Fiction The Butcher of Anderson StationGods of RiskThe ChurnThe Vital AbyssStrange Dogs",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780316217590',
              },
              {
                type: 'ISBN_10',
                identifier: '031621759X',
              },
            ],
            pageCount: 544,
            averageRating: 4.5,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=A_-zBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=A_-zBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              'The fifth book in the NYT bestselling Expanse series, Nemesis Games drives the crew of the Rocinante apart, and as they struggle to survive, the inner planets fall victim to an enemy&#39;s catastrophic plan.',
          },
        },
        {
          id: 'JZpeDwAAQBAJ',
          volumeInfo: {
            title: "Tiamat's Wrath",
            authors: ['James S. A. Corey'],
            publishedDate: '2019-03-26',
            description:
              "NOW A PRIME ORIGINAL SERIES Thirteen hundred gates have opened to solar systems around the galaxy. But as humanity builds its interstellar empire in the alien ruins, the mysteries and threats grow deeper. In the dead systems where gates lead to stranger things than alien planets, Elvi Okoye begins a desperate search to discover the nature of a genocide that happened before the first human beings existed, and to find weapons to fight a war against forces at the edge of the imaginable. But the price of that knowledge may be higher than she can pay. At the heart of the empire, Teresa Duarte prepares to take on the burden of her father's godlike ambition. The sociopathic scientist Paolo Cortázar and the Mephistophelian prisoner James Holden are only two of the dangers in a palace thick with intrigue, but Teresa has a mind of her own and secrets even her father the emperor doesn't guess. And throughout the wide human empire, the scattered crew of the Rocinante fights a brave rear-guard action against Duarte's authoritarian regime. Memory of the old order falls away, and a future under Laconia's eternal rule - and with it, a battle that humanity can only lose - seems more and more certain. Because against the terrors that lie between worlds, courage and ambition will not be enough . . . The Expanse series: Leviathan Wakes Caliban's War Abaddon's Gate Cibola Burn Nemesis Games Babylon's Ashes Persepolis Rising Tiamat's Wrath Praise for the Expanse: 'The science fictional equivalent of A Song of Ice and Fire' NPR Books 'As close as you'll get to a Hollywood blockbuster in book form' io9.com 'Great characters, excellent dialogue, memorable fights' wired.com 'High adventure equalling the best space opera has to offer, cutting-edge technology and a group of unforgettable characters . . . Perhaps one of the best tales the genre has yet to produce' Library Journal 'This is the future the way it's supposed to be' Wall Street Journal 'Tense and thrilling' SciFiNow",
            industryIdentifiers: [
              {
                type: 'ISBN_13',
                identifier: '9780356510330',
              },
              {
                type: 'ISBN_10',
                identifier: '0356510336',
              },
            ],
            pageCount: 544,
            averageRating: 4,
            imageLinks: {
              smallThumbnail:
                'http://books.google.com/books/content?id=JZpeDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
              thumbnail:
                'http://books.google.com/books/content?id=JZpeDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            },
          },
          searchInfo: {
            textSnippet:
              '. . Perhaps one of the best tales the genre has yet to produce&#39; Library Journal &#39;This is the future the way it&#39;s supposed to be&#39; Wall Street Journal &#39;Tense and thrilling&#39; SciFiNow',
          },
        },
      ],
    };
  },
  methods: {
    lookupBook() {
      const volumeInfo = [
        'title',
        'authors',
        'publishedDate',
        'description',
        'industryIdentifiers',
        'pageCount',
        'averageRating',
        'imageLinks',
      ].join(',');
      const searchString = [
        this.search ? `${this.search}` : null,
        this.title ? `intitle:${this.title}` : null,
        this.author ? `inauthor:${this.author}` : null,
        this.isbn ? `isbn:${this.isbn}` : null,
      ]
        .filter(Boolean)
        .join('+');
      console.log(searchString);
      fetch(
        'https://www.googleapis.com/books/v1/volumes' +
          `?q=${searchString}` +
          `&fields=items(id,volumeInfo(${volumeInfo}),searchInfo)`,
        {
          method: 'get',
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error.message);
          }
          console.log(data);
          this.searchResults = data.items;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    emitLoad(book) {
      this.$emit('load', book);
    },
  },
};
</script>
