function makeModel (mongoose,...dependencies){
    
  if (!mongoose.models.Token){
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
        id:{
          type:String,
          unique:true,
          uniqueCaseInsensitive:true
        },
        name:{ type:String },
        symbol:{ type:String },
        address:{ type:String },
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

    const Token = mongoose.model('Token',schema,'Token');
    return Token;
  }
  else {
    return mongoose.models.Token;
  }
}
module.exports = makeModel;