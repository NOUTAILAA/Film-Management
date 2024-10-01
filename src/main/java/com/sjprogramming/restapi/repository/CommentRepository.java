package com.sjprogramming.restapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByFilmId(Long filmId);

}
