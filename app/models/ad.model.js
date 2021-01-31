module.exports = mongoose => {
    const Ad = mongoose.model(
      "ad",
      mongoose.Schema(
        {
          id: String,
          description: String,
          imageUrl: String,
          targeting: {
            lat: Number,
            long: Number,
            radius: Number,
          },
          operatingSystems: [String],
          browsers: [String],
          tags: [String],          
        },
      )
    );
  
    return Ad;
  };