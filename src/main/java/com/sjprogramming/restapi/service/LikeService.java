package com.sjprogramming.restapi.service;

import com.sjprogramming.restapi.entity.Like;
import com.sjprogramming.restapi.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    // Méthode pour aimer un film
    public Like addLike(Like like) {
        return likeRepository.save(like);
    }

    // Méthode pour supprimer un like
    public void removeLike(Long userId, Long filmId) {
        Optional<Like> like = likeRepository.findByUserIdAndFilmId(userId, filmId);
        like.ifPresent(likeRepository::delete);
    }

    // Méthode pour obtenir les likes d'un utilisateur
    public List<Like> getLikesByUser(Long userId) {
        return likeRepository.findByUserId(userId);
    }
}
