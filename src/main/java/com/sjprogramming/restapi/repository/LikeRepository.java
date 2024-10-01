package com.sjprogramming.restapi.repository;

import com.sjprogramming.restapi.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query("SELECT COUNT(l) FROM Like l WHERE l.film.id = :filmId")
    long countLikesByFilmId(@Param("filmId") Long filmId);
}
