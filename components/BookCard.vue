<template>
  <li
    class="book"
    :class="{ 'book--prioritized': prioritize, 'book--purchased': purchased }"
  >
    <div class="book__thumbnail">
      <img
        v-if="thumbnail"
        :src="thumbnail"
        alt=""
        class="book__thumbnail-media"
      />
    </div>
    <div class="book__info">
      <h2 class="book__headline">
        <span class="book__title">{{ title }}</span>
        <span v-if="series" class="book__series">({{ series }})</span>
      </h2>
      <p class="book__author">by {{ authorFirst }} {{ authorLast }}</p>
      <p class="book__rating num">
        <span class="sr-only">Rating:</span> {{ rating.toFixed(1) }}
      </p>
      <p class="book__length num">
        <span class="sr-only">Length:</span> {{ length }}p
      </p>
      <blockquote v-if="textSnippet">
        <p class="book__snippet">{{ textSnippet }}</p>
      </blockquote>
      <p v-if="source || note" class="book__recommendation">
        <span v-if="source" class="book__source"
          >Recommended by {{ source }}</span
        ><span v-if="source && note">: </span
        ><q v-if="note" class="book__note">{{ note }}</q>
      </p>
    </div>
    <div v-if="isLoggedIn && isEditable" class="book__actions">
      <AppButton
        :to="`/edit/${isbn}`"
        class="button--icon-only button--primary"
      >
        <span aria-hidden="true" class="button__icon">✏️</span>
        <span class="sr-only">Edit</span>
      </AppButton>
      <AppButton
        :to="`/delete/${isbn}`"
        class="button--icon-only button--secondary"
      >
        <span aria-hidden="true" class="button__icon">❌</span>
        <span class="sr-only">Delete</span>
      </AppButton>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      default: null,
    },
    authorFirst: {
      type: String,
      required: true,
    },
    authorLast: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
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
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
};
</script>

<style lang="scss">
$color_purchased: rgba(0, 128, 0, 0.33);
$color_prioritized: rgba(255, 0, 0, 0.33);
$color_warning: #ffc;
$color_danger: #fcc;
$color_shadow1: rgba(0, 0, 0, 0.12);
$color_shadow2: rgba(0, 0, 0, 0.24);

.book {
  background: var(--color-book-bg);
  border-radius: 3px;
  box-shadow: 0 1px 3px $color_shadow1, 0 1px 2px $color_shadow2;
  margin: 0;
  padding: 1em 1em 0.5em;
  position: relative;
  display: flex;

  > * + * {
    margin-left: 1em;
  }

  &::before {
    background: var(--color-rating-bg);
    border-bottom-left-radius: 4px;
    border-top-right-radius: 4px;
    content: '';
    display: block;
    height: 5.25rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 4.5rem;
  }

  &::after {
    border: 10px solid transparent;
    border-top-left-radius: 4px;
    content: '';
    height: 0;
    left: 0;
    position: absolute;
    top: 0;
    width: 0;
  }
}

.book--purchased {
  &::after {
    border-left-color: $color_purchased;
    border-top-color: $color_purchased;
  }
}

.book--prioritized {
  &::after {
    border-left-color: $color_prioritized;
    border-top-color: $color_prioritized;
  }

  &.book--purchased {
    &::after {
      border-left-color: $color_purchased;
    }
  }
}

.book__thumbnail {
  flex: none;
  max-width: 25%;
  width: 50px;

  @media screen and (min-width: 640px) {
    width: 100px;
  }
}

.book__thumbnail-media {
  display: block;
  height: auto;
  width: 100%;
}

.book__info {
  flex: 1;

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
}

.book__headline {
  color: var(--color-headline-text);
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.33em;
  margin-right: 4rem;

  @media screen and (min-width: 640px) {
    font-size: 1.5em;
  }
}

.book__series {
  font-weight: 300;
  opacity: 0.5;
}

.book__author {
  line-height: 1.2;
  margin-right: 4rem;
  opacity: 0.7;
}

.book__rating {
  font-size: 2em;
  font-weight: 200;
  line-height: 1;
  opacity: 0.5;
  position: absolute;
  right: 0;
  text-align: center;
  top: 1rem;
  width: 4.5rem;
}

.book__length {
  line-height: 1;
  opacity: 0.5;
  position: absolute;
  right: 0;
  text-align: center;
  top: 3.5rem;
  width: 4.5rem;
}

.book__snippet {
  word-wrap: break-word; // 1
  overflow-wrap: break-word; // 2
}

.book__recommendation {
  background: var(--color-recommendation-bg);
  margin: 0 -0.5em;
  opacity: 0.7;
  padding: 0.4em 0.75em;
}

.book__note {
  word-wrap: break-word; // 1
  overflow-wrap: break-word; // 2
  font-style: italic;
}

.book__actions {
  display: flex;
  flex: none;
  flex-direction: column;
  padding-top: 5rem;

  .button + .button {
    margin-left: 0;
    margin-top: 0.5em;
  }
}
</style>
