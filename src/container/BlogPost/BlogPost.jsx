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
    // Komponen state dari React untuk statefull component
    listArtikel: [], // Varibel array yang digunakan untuk menyimpan data API
  };

  componentDidMount() {
    // Komponen untuk mengecek ketika component telah di-mount-ing, maka panggil API
    fetch('http://localhost:3001/posts') // Alamat URL API yang ingin kita ambil datanya
      .then((response) => response.json()) // Ubah response data dari URL API menjadi sebuah data json
      .then((json) => {
        // Data json hasil ambil dari API ketika masukkan ke dalam listArtikel pada state
        this.setState({
          listArtikel: json,
        });
      });
  }

  render() {
    return (
      <div className="post-artikel">
        <h2>Daftar Artikel</h2>
        {this.state.listArtikel.map((artikel) => {
          // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
          return <Post key={artikel.id} judul={artikel.title} isi={artikel.body} />; // Mappingkan data json dari API sesuai dengan kategorinya
        })}
      </div>
    );
  }
}

export default BlogPost;

// https://jsonplaceholder.typicode.com/posts
