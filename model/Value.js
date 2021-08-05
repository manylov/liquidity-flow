function makeModel (mongoose,...dependencies){
    
  if (!mongoose.models.Value){
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
        pair:{
          type:Schema.Types.ObjectId,
          ref:'Pair'
        },
        time:{ type:Date },
        value:{ type:Number },
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

    const Value = mongoose.model('Value',schema,'Value');
    return Value;
  }
  else {
    return mongoose.models.Value;
  }
}
module.exports = makeModel;