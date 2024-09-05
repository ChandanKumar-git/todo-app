const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  name: { type: String, 
          required: true 
        },
        
  description: { type: String },

  completed: { type: Boolean,
               default: false 
            },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
