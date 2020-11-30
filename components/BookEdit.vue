<template>
  <form class="form">
    <FormInput v-model="title" label="Title" required="true" />

    <FormInput v-model="series" label="Series" required="true" />

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
      <button class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    series: {
      type: String,
      default: null,
    },
    authorFirst: {
      type: String,
      default: null,
    },
    authorLast: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: null,
    },
    length: {
      type: Number,
      default: null,
    },
    isbn: {
      type: String,
      default: null,
    },
    release: {
      type: String,
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    textSnippet: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      default: null,
    },
    note: {
      type: String,
      default: null,
    },
    purchased: {
      type: Boolean,
      default: false,
    },
    prioritize: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
