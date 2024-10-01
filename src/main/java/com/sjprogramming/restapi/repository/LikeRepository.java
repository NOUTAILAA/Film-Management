package com.sjprogramming.restapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjprogramming.restapi.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query("SELECT COUNT(l) FROM Like l WHERE l.film.id = :filmId")
    long countLikesByFilmId(@Param("filmId") Long filmId);

	void deleteByUserIdAndFilmId(Long userId, Long filmId);
	List<Like> findByUserId(Long userId);
    Optional<Like> findByUserIdAndFilmId(Long userId, Long filmId);

}
