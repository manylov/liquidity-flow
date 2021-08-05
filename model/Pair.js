function makeModel (mongoose,...dependencies){
    
  if (!mongoose.models.Pair){
    const mongoosePaginate = require('mongoose-paginate-v2');
    const idvalidator = require('mongoose-id-validator');
    const uniqueValidator = require('mongoose-unique-validator');
    const myCustomLabels = {
      totalDocs: 'itemCount',
      docs: 'data',
      limit: 'perPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      totalPages: 'pageCount',
      pagingCounter: 'slNo',
      meta: 'paginator',
    };
    mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
    const Schema = mongoose.Schema;
    const schema = new Schema(
      {
        name:{ type:String },
        address:{ type:String },
        id:{
          type:String,
          unique:true,
          uniqueCaseInsensitive:true
        },
        token1:{
          type:Schema.Types.ObjectId,
          ref:'Token'
        },
        token2:{
          type:Schema.Types.ObjectId,
          ref:'Token'
        },
        isDeleted:Boolean,
        isActive:Boolean,
        addedBy:{
          type:Schema.Types.ObjectId,
          ref:'user'
        }
      },
      {
        timestamps: {
          createdAt: 'createdAt',
          updatedAt: 'updatedAt' 
        } 
      }
    );

    schema.pre('save', async function (next) {
      this.isDeleted = false;
      this.isActive = true;
      next();
    });
    schema.method('toJSON', function () {
      const {
        __v, ...object 
      } = this.toObject();
      object.id = object._id;
      return object;
    });
    schema.plugin(mongoosePaginate);
    schema.plugin(idvalidator);

    schema.plugin(uniqueValidator);

    const Pair = mongoose.model('Pair',schema,'Pair');
    return Pair;
  }
  else {
    return mongoose.models.Pair;
  }
}
module.exports = makeModel;