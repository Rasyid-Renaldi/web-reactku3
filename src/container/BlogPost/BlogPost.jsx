import React, { Component } from 'react';
import '././BlogPost.css';
import Post from '../../component/BlogPost/Post';

// class BlogPost extends Component {
//   render() {
//     return (
//       <div class="post-artikel">
//         <h2>Daftar Artikel</h2>
//         <Post judul="JTI Polinema" isi="Jurusan Teknologi Informasi - Politeknik Negeri Malang" />
//       </div>
//     );
//   }
// }

// export default BlogPost;

// class BlogPost extends Component {
//     render() {
//         return(
//             <p>Blog Artikel</p>
//         )
//     }
// }
// export default BlogPost;

// import Post from '../../component/BlogPost/Post';

class BlogPost extends Component {
  state = {
    listArtikel: [],
    insertArtikel: {
      userId: 1,
      id: 1,
      title: '',
      body: '',
    },
  };

  ambilDataDariServerAPI = () => {
    fetch('http://localhost:3001/posts?_sort=id&_order=desc')
      .then((response) => response.json())
      .then((jsonHasilAmbilDariAPI) => {
        this.setState({
          listArtikel: jsonHasilAmbilDariAPI,
        });
      });
  };

  componentDidMount() {
    this.ambilDataDariServerAPI();
  }

  handleHapusArtikel = (data) => {
    fetch(`http://localhost:3001/posts/${data}`, { method: 'DELETE' }).then((res) => {
      this.ambilDataDariServerAPI();
    });
  };

  handleTambahArtikel = (event) => {
    let formInsertArtikel = { ...this.state.insertArtikel };
    let timestamp = new Date().getTime();
    formInsertArtikel['id'] = timestamp;
    formInsertArtikel[event.target.name] = event.target.value;
    this.setState({
      insertArtikel: formInsertArtikel,
    });
  };

  handleTombolSimpan = () => {
    fetch('http://localhost:3001/posts', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.insertArtikel),
    }).then((Response) => {
      this.ambilDataDariServerAPI();
    });
  };

  render() {
    return (
      <div className="post-artikel">
        <div className="form pb-2 border-bottom">
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Judul
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="body" className="col-sm-2 col-form-label">
              Isi
            </label>
            <div className="col-sm-10">
              <textarea className="form-control" id="body" name="body" rows="3" onChange={this.handleHapusArtikel}></textarea>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>
            Simpan
          </button>
        </div>
        <h2>Daftar Artikel</h2>
        {this.state.listArtikel.map((artikel) => {
          return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} idArtikel={artikel.id} hapusArtikel={this.handleHapusArtikel} />;
        })}
      </div>
    );
  }
}

export default BlogPost;

// class BlogPost extends Component {
//   state = {
//     // Komponen state dari React untuk statefull component
//     listArtikel: [], // Varibel array yang digunakan untuk menyimpan data API
//   };

//   componentDidMount() {
//     // Komponen untuk mengecek ketika component telah di-mount-ing, maka panggil API
//     fetch('http://localhost:3001/posts') // Alamat URL API yang ingin kita ambil datanya
//       .then((response) => response.json()) // Ubah response data dari URL API menjadi sebuah data json
//       .then((json) => {
//         // Data json hasil ambil dari API ketika masukkan ke dalam listArtikel pada state
//         this.setState({
//           listArtikel: json,
//         });
//       });
//   }

//   render() {
//     return (
//       <div className="post-artikel">
//         <h2>Daftar Artikel</h2>
//         {this.state.listArtikel.map((artikel) => {
//           // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
//           return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} />; // Mappingkan data json dari API sesuai dengan kategorinya
//         })}
//       </div>
//     );
//   }
// }

// export default BlogPost;

// // https://jsonplaceholder.typicode.com/posts
