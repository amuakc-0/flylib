package dev.partridgeandorange.flylib.repo;

import dev.partridgeandorange.flylib.model.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatternRepo extends JpaRepository <Pattern, Long> {
    //Query for searching based on type of fly
    @Query(value = "select * from pattern where type_fly like :keyword", nativeQuery = true)
    List<Pattern> findByKeyword(@Param("keyword") String keyword);

    //Query for searching based on pattern name
    @Query(value = "select * from pattern where pattern_name like :keyword", nativeQuery = true)
    List<Pattern> findByName(@Param("keyword") String keyword);

    //Query for searching based on material
    @Query(value = "select * from pattern where material like %:keyword%", nativeQuery = true)
    List<Pattern> findByMaterial(@Param("keyword") String keyword);
}