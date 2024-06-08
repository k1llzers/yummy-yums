package org.naukma.yummyyams.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);

    @Query("select u from UserEntity u where lower(concat(u.name, ' ', u.surname)) like lower(:restrict) or lower(u.email) like lower(:restrict)")
    List<UserEntity> findAllByRestrict(@Param("restrict") String restrict);
}
