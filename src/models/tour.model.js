import mongoose from "mongoose";
import slugify from "slugify";

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        trim: true,
        unique: true,
        maxlength: [40, 'Maximum characters: 40'],
        minlength: [10, 'Minimum characters: 10']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty level'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, or difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1'],
        max: [5, 'Rating must be below 5']
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price'
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secret: {
        type: Boolean,
        default: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});
//document middleware
//before .save() and .create(), lower the name of the tour before sending in db
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
tourSchema.pre(/^find/, function (next) {
    this.find({ secret: { $ne: true } }); //secret/private tours will be excluded
    this.start = Date.now(); // query time tracker
    next();
});
tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    console.log(docs);
    next();
});
export default mongoose.model('Tour', tourSchema);
//before aggregating, filter out secret tours
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { secret: { $ne: true } } }); //secret/private tours will be excluded
    console.log(this.pipeline());
    next();
});