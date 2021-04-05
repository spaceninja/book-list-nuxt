<template>
  <div>
    <h2 v-if="isbn">Edit Book</h2>
    <h2 v-else>Add Book</h2>
    <form class="form" @submit.prevent="saveBook">
      <FormInput v-model="title" label="Title" required="true" />

      <FormInput v-model="series" label="Series" />

      <FormInput
        v-model="authorFirst"
        label="Author First Name"
        required="true"
      />

      <FormInput
        v-model="authorLast"
        label="Author Last Name"
        required="true"
      />

      <FormInput
        v-model.number="rating"
        label="Rating"
        type="number"
        append="/ 5"
        max="5"
        min="0"
        step="0.01"
        required="true"
      />

      <FormInput
        v-model.number="length"
        label="Length"
        type="number"
        append="pages"
        required="true"
      />

      <FormInput v-model="isbn" label="ISBN" required="true" />

      <FormInput
        v-model="release"
        label="Release Date"
        type="date"
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
      />

      <FormInput
        v-model="thumbnail"
        label="Thumbnail"
        class="form__group--doublewide"
      />

      <FormInput
        v-model="textSnippet"
        label="Blurb"
        type="textarea"
        class="form__group--doublewide"
        help="A short blurb introducing the book."
      />

      <FormInput
        v-model="source"
        label="Source"
        class="form__group--doublewide"
        prepend="Recommended by"
      />

      <FormInput
        v-model="note"
        label="Note"
        type="textarea"
        class="form__group--doublewide"
        help="A note explaining why you’re interested in this book."
      />

      <FormInput v-model="purchased" label="Purchased" type="checkbox" />

      <FormInput v-model="prioritize" label="Prioritize" type="checkbox" />

      <div class="form__group form__group--actions form__group--doublewide">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary" @click="getCover">
          Get Cover
        </button>
      </div>
    </form>
    <img :src="thumbnail" alt="" />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  computed: {
    ...mapFields([
      'books.selectedBook.title',
      'books.selectedBook.series',
      'books.selectedBook.authorFirst',
      'books.selectedBook.authorLast',
      'books.selectedBook.rating',
      'books.selectedBook.length',
      'books.selectedBook.isbn',
      'books.selectedBook.release',
      'books.selectedBook.thumbnail',
      'books.selectedBook.textSnippet',
      'books.selectedBook.source',
      'books.selectedBook.note',
      'books.selectedBook.purchased',
      'books.selectedBook.prioritize',
    ]),
  },
  methods: {
    saveBook() {
      if (
        this.isbn &&
        this.title &&
        this.authorFirst &&
        this.authorLast &&
        this.rating &&
        this.length
      ) {
        this.$emit('save');
      }
    },
    getCover() {
      fetch(
        'https://www.googleapis.com/books/v1/volumes?q=isbn:' +
          this.isbn +
          '&fields=items(volumeInfo(imageLinks))' +
          '&key=' +
          process.env.NUXT_ENV_FIRE_APIKEY,
        { method: 'get' }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error.message);
          }
          console.log(data);
          // const book = this.state.book;
          let img = data.items[0].volumeInfo.imageLinks.thumbnail;
          img = img.replace(/^http:\/\//i, 'https://');
          // book.thumbnail = img;
          // this.setState({ book });
          this.thumbnail = img;
          console.log('IMG', img);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
