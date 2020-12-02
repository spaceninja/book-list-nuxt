<template>
  <form class="form" @submit.prevent="saveBook">
    <FormInput v-model="title" label="Title" required="true" />

    <FormInput v-model="series" label="Series" />

    <FormInput
      v-model="authorFirst"
      label="Author First Name"
      required="true"
    />

    <FormInput v-model="authorLast" label="Author Last Name" required="true" />

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
    </div>
  </form>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  computed: {
    ...mapFields([
      'book.title',
      'book.series',
      'book.authorFirst',
      'book.authorLast',
      'book.rating',
      'book.length',
      'book.isbn',
      'book.release',
      'book.thumbnail',
      'book.textSnippet',
      'book.source',
      'book.note',
      'book.purchased',
      'book.prioritize',
    ]),
  },
  methods: {
    saveBook() {
      this.$emit('save');
    },
  },
};
</script>
