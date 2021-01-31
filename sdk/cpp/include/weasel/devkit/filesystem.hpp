/**
 * Copyright 2018-2020 Pejman Ghorbanzade. All rights reserved.
 */

#pragma once

#if ((defined(_MSVC_LANG) && _MSVC_LANG >= 201703L) || (defined(__cplusplus) && __cplusplus >= 201703L)) && defined(__has_include)
#if __has_include(<filesystem>) && (!defined(__MAC_OS_X_VERSION_MIN_REQUIRED) || __MAC_OS_X_VERSION_MIN_REQUIRED >= 101500)
#define GHC_USE_STD_FS
#include <filesystem>
namespace weasel {
    namespace filesystem = std::filesystem;
}
#endif
#endif
#ifndef GHC_USE_STD_FS
#include <ghc/fs_fwd.hpp>
namespace weasel {
    namespace filesystem = ghc::filesystem;
}
#endif