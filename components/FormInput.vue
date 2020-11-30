<template>
  <div
    class="form__group"
    :class="{
      'form__group--check': isCheckbox,
    }"
  >
    <label v-if="!isCheckbox" class="form__label" :for="uuid">
      {{ label }}
    </label>

    <span :class="{ 'form__input-group': prepend || append }">
      <span v-if="prepend" class="form__input-group-prepend">
        {{ prepend }}
      </span>

      <!--
        I don't like the duplicated attributes across these three, but there's a
        bug when using a dynamic component where the textarea doesn't update.
        @see https://github.com/vuejs/vue/issues/6154
      -->
      <textarea
        v-if="isTextarea"
        :id="uuid"
        :value="value"
        class="form__control"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      />
      <input
        v-else-if="isCheckbox"
        :id="uuid"
        :checked="value"
        :type="type"
        class="form__checkbox-input"
        v-bind="$attrs"
        @input="$emit('input', $event.target.checked)"
      />
      <input
        v-else
        :id="uuid"
        :value="value"
        :type="type"
        class="form__control"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      />

      <span v-if="append" class="form__input-group-append">
        {{ append }}
      </span>
    </span>

    <small v-if="help" class="form__help">
      {{ help }}
    </small>

    <label
      v-if="isCheckbox"
      class="form__label form__checkbox-label"
      :for="uuid"
    >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    prepend: {
      type: String,
      default: null,
    },
    append: {
      type: String,
      default: null,
    },
    help: {
      type: String,
      default: null,
    },
  },
  computed: {
    isCheckbox() {
      return this.type === 'checkbox';
    },
    isTextarea() {
      return this.type === 'textarea';
    },
    uuid() {
      return this.getUUID();
    },
  },
  methods: {
    /**
     * Generate a random UUID
     * This is total overkill, but I need a unique ID for each input component.
     * @see https://gist.github.com/jed/982883
     */
    getUUID(a) {
      return a
        ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.getUUID);
    },
  },
};
</script>
