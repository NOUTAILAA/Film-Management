package com.sjprogramming.restapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sjprogramming.restapi.entity.Like;
import com.sjprogramming.restapi.repository.LikeRepository;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;
    @PostMapping
    public Like addLike(@RequestBody Like like) {
        if (like.getFilm() == null || like.getFilm().getId() == null) {
            throw new IllegalArgumentException("Film must not be null");
        }
        if (like.getUser() == null || like.getUser().getId() == null) {
            throw new IllegalArgumentException("User must not be null");
        }
        return likeRepository.save(like);
    }

    @DeleteMapping("/{id}")
    public void removeLike(@PathVariable Long id) {
        likeRepository.deleteById(id);
    }

    @GetMapping("/count/{filmId}")
    public long countLikes(@PathVariable Long filmId) {
        return likeRepository.countLikesByFilmId(filmId);
    }
}
