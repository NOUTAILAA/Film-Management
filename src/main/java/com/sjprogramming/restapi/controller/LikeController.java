package com.sjprogramming.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjprogramming.restapi.entity.Like;
import com.sjprogramming.restapi.repository.LikeRepository;
import com.sjprogramming.restapi.service.LikeService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
	 @Autowired
	    private LikeService likeService;
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
    @GetMapping("/user/{userId}")
    public List<Like> getLikesByUser(@PathVariable Long userId) {
        return likeService.getLikesByUser(userId);
    }

}
