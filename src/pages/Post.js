import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../components.css";
import MonacoEditorComponent from "../components/MonacoEditor/MonacaEditor";
import CommentForm from "../components/Comment/CommentForm";
import CommentList from "../components/Comment/CommentList";
function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docSnap = await getDoc(doc(db, "post", postId));

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("Post bulunamadı.");
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div style={{ margin: "0px" }}>
      {post ? (
        <Container id="post-con">
          <Row>
            <Col md={9}>
              <Container className="p-4" id="post">
                <Row>
                  <p className="h5 mb-4">{post.titleVal}</p>
                </Row>
                <Row className="m-2 mb-4 ">{post.TxtVal}</Row>
                { post.ImgVal ? (<Row>
                    <Image
                      src={post.ImgVal}
                      alt="Örnek Resim"
                      style={{ maxWidth: "30%", height: "auto" }}
                      thumbnail
                    />
                  </Row>) : ( <Row></Row>)
                  
                }
              </Container>
            </Col>

            <Col md={3} id="code-blog">
              <MonacoEditorComponent data={post.TxtVal} />
            </Col>
          </Row>
          <Row className="p-2" id="comments-blok">
            <CommentForm postId={postId} />
            <br />
            <CommentList postId={postId} />
          </Row>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Post;