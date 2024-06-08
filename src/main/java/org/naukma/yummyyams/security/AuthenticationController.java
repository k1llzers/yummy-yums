package org.naukma.yummyyams.security;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.security.dto.AuthRequest;
import org.naukma.yummyyams.security.dto.TokenResponse;
import org.naukma.yummyyams.user.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/auth")
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        UserEntity principal = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(
                new TokenResponse(jwtService.generateToken(authRequest.getUsername()), principal.getRole(), principal.getId()));
    }
}
