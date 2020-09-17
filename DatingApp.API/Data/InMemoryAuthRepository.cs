using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class InMemoryAuthRepository : IAuthRepository
    {
        Dictionary<string,User> users = new Dictionary<string, User>();
        public Task<User> Login(string username, string password)
        {
            //User a = new User();
            if(users.ContainsKey(username))
            {
              User a =  users.GetValueOrDefault(username);

              if(verifyPasswordHash(password, a.PasswordHash, a.PasswordSalt))
              {
                return Task.FromResult(a);
              }
            }

           return Task.FromResult<User>(null);
        }

        public Task<User> Register(User user, string password)
        {
           users.Add(user.Username, user);

           byte[] passwordHash, passwordSalt;
            createPasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            return Task.FromResult(user);
        }

        public Task<bool> UserExists(string username)
        {
        
            if(users.ContainsKey(username))
            {
                return Task.FromResult(true);
            } 
            

            return Task.FromResult(false);
        }

        private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for(int i=0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        private void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}