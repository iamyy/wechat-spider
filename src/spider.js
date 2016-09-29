const request = require( 'request' );
const fs = require( 'fs' );
const headers = require( './headers.js' );

const baseUrl = 'https://mp.weixin.qq.com/mp/getmasssendmsg';

class Spider {
  constructor ( options ) {
	  this.options = options;
		this.count = 0;
	}
	getArticleList ( url, headers ) {
	  return new Promise( ( resolve, reject ) => {
		  request( { url, headers }, ( error, response, body ) => {
			  if( error ) {
				  return reject( error );
				}
				resolve( body );
			} );
		} );
	}
	_compileUrl ( fromid ) {
	  return fromid ? 
      `${baseUrl}?__biz=${this.options.biz}&uin=${this.options.uin}&key=${this.options.key}&frommsgid=${fromid}&f=json`
			:	
      `${baseUrl}?__biz=${this.options.biz}&uin=${this.options.uin}&key=${this.options.key}&f=json`;
	}
	_compileHeaders () {
	  return headers;
	}
	async run ( fromid ) {
		let articleList = await this.getArticleList( this._compileUrl( fromid ), this._compileHeaders() );
		articleList = JSON.parse( JSON.parse( articleList ).general_msg_list ).list;
		let lc = 0;

		if( ! fs.existsSync('output') ) {
		  fs.mkdirSync( 'output' ); 
		}

		articleList.forEach( ( a, i, arr ) => {
			if( a.app_msg_ext_info ) {
			  let obj = {
				  id : a.comm_msg_info.id,
					title : a.app_msg_ext_info.title,
					desc : a.app_msg_ext_info.digest,
					url : a.app_msg_ext_info.content_url,
					cover : a.app_msg_ext_info.cover
				}
				lc++;
				console.log( ++this.count,  obj.title );
				fs.writeFileSync( `./output/${obj.id}.json`, JSON.stringify( obj ) )

				if( a.app_msg_ext_info.multi_app_msg_item_list ) {
				  a.app_msg_ext_info.multi_app_msg_item_list.forEach( ( item, j ) => {
					  let obj_1 = {
						  id : item.fileid,
							title : item.title,
							desc : item.digest,
							url : item.content_url,
							cover : item.cover
						} 
						console.log( ++this.count, obj_1.title )
						fs.writeFileSync( `./output/${obj_1.id}.json`, JSON.stringify( obj_1 ) )
					} )
				}
			}
		} );
    articleList[ lc - 1 ] && this.run( articleList[ articleList.length - 1 ].comm_msg_info.id )
	}
}

module.exports = Spider;
