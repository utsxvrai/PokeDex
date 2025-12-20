const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema(
  {
    // Reference ID from PokeAPI
    pokemonId: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },

    // Basic identity
    name: {
      type: String,
      required: true,
      index: true
    },

    // Image for UI
    image: {
      type: String,
      required: true
    },

    // Physical attributes
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },

    // Classification
    types: {
      type: [String],
      required: true,
      index: true
    },

    // Core battle stats (cleaned)
    stats: {
      hp: {
        type: Number,
        required: true
      },
      attack: {
        type: Number,
        required: true
      },
      defense: {
        type: Number,
        required: true
      },
      speed: {
        type: Number,
        required: true
      }
    },

    // Human-readable description (for UI + semantic search)
    description: {
      type: String,
      default: ''
    },

    // Helps resume description-generation script
    descriptionGenerated: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Full-text search index
pokemonSchema.index({
  name: 'text',
  types: 'text',
  description: 'text'
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
