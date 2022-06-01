// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

#pragma once

#include "touca/cmp/options.hpp"
#include "touca/cmp/stats.hpp"

namespace touca {
struct ComparisonJob;
struct Testcase;
}  // namespace touca

void collector(const Options& options, Resources& resources);

void reporter(const Options& options, Resources& resources);

void processor(const Options& options, Resources& resources);
